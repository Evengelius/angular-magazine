import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Collection } from '../classes/collection';
import { CollectionService } from './collection.service';
import { ArticleService } from './article.service';
import { Article } from '../classes/article';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  // --------------------------- CONSTRUCTOR --------------------------- \\

  constructor(private collectionService: CollectionService,
              private router: Router,
              private articlesService: ArticleService,
              private viewScroller: ViewportScroller) {

  }

  // --------------------------- OBSERVABLES --------------------------- \\

  // Observables that contain the stream of collections and articles.
  collections$ = this.collectionService.findAll();
  articles$ = this.articlesService.findAll();


  /**
   * <strong>BehaviorSubject</strong><br />
   * It is a kind of observable that can act also act as an observer. <br />
   * Its goal is being able to keep watching components dynamically, by subscribing to itself <br />
   * -------------------------------<br />
   * <strong>BehaviorSubject | Collection Observable & Observer | On Selected Collection</strong> <br />
   * Used to hold the collection's stream of data, including their respective articles.
   */
  selectedCollectionSubject: BehaviorSubject<Collection | any> = new BehaviorSubject(null); // BehaviorSubject
  selectedCollection$ = this.selectedCollectionSubject.asObservable(); // Defined as Observable => we can subscribe to it
  // Defined as Observable => When "this.selectedCollectionSubject.next(selectedCollection)" is called, this observable is launch => combineLatest.

  /**
   * <strong>BehaviorSubject | Collection Observable & Observer | On Collection Route Refreshing</strong> <br />
   * Used to keep watching the URL : it will hold collection url route with its related articles, <br />once we refresh the page
   */
  collectionRouteSubject: BehaviorSubject<Collection | any> = new BehaviorSubject(null); // BehaviorSubject
  collectionRoute$ = this.collectionRouteSubject.asObservable();
  // Defined as Observable => When "this.collectionRouteSubject.next(collectionRoute)" is called, this observable is launch => combineLatest


  /**
   * <strong>combineLatest</strong> <br />
   * Combine multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables. <br />
   * Then it return that Observable that contains the projected values from the most recent values, (or an array of the most recent values), from each input Observable combined, from each input Observable.<br />
   * <a href="https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest">combineLatest</a> <br />
   *
   * Here it will combine the defined above observables : collections$, articles$, selectedCollection$, and collectionRoute$ <br />
   * Then it will create an Unique Observable that contains the most recent values,(or an array of the most recent values), from each of those Observable combined
   * And return this observable.
   */
  mappedObservable$ = combineLatest([
    this.collections$,
    this.articles$,
    this.selectedCollection$,
    this.collectionRoute$
  ]).pipe(
    map(([collections, articles, selectedCollection, collectionRoute]) => {

      // --------------------------- CATEGORY --------------------------- \\

      /* For each collection | findAll */
      const mappedCollection: Collection[] = collections.map(collection => {
        articles.filter(article => this.findArticleCollectionById(article, collection.id));
        // I collect all of their respective article, and map them into an array rest operator => ...collection
        return {
          ...collection,
        };
      }); // mappedCollection = collections with their number of articles.

      // console.log(mappedCollection)

      // --------------------------- ARTICLE --------------------------- \\

      /**
       * mappedArticles = articles filtered by their respective collection :
       * 1. If the collection is selected on the component sidebar => shows only the related articles by the selected collection.
       * 2. Else if URL contains a collection => once the page is refreshed, we make sure that we stay on the same page of that same collection according to the URL.
       * 3. Else => it displays all the articles.
       */
      let mappedArticles: Article[];
      if (selectedCollection) {
        mappedArticles = articles.filter(article => {
          return this.findArticleCollectionById(article, selectedCollection.id) // 1.
        });
        // console.log(mappedArticles);
      } else if (collectionRoute) { // 2.
        mappedArticles = articles.filter(article => {
          return article.collection_id.id.toString() === collectionRoute; // Need to convert into string else it won't work.
          // console.log(mappedArticles);
        })
      } else {
        mappedArticles = articles; // 3.
        // console.log(mappedArticles);
      }

      /**
       * Return these values, that will be used in the new combined Observable,
       * So that I only pick which one I need. Cf. Collection Component and NewsFeed Component
       */
      return { mappedCollection, mappedArticles};
    }),
  );

  // --------------------------- METHODS --------------------------- \\

  findArticleCollectionById(article: Article, collectionId: number) {
    return article.collection_id.id === collectionId;
  }


  // --------------------------- OBSERVERS | TRIGGER --------------------------- \\
  /**
   * <strong>EventEmitter | On Selected Collection | SideBar | BehaviorSubject Trigger</strong><br />
   * The selectedCollectionSubject is an observable that contains a stream of Collection to be observed.  <br />
   * This streamed is then observed in the EventEmitter in the sidebar component. <br />
   * So that whenever we click on a collection, <br />
   * 1. It emits the $event <br />
   * 2. Triggers the observer here : this.selectedCollectionSubject.next(selectedCollection) <br />
   * 3. Show the articles according to their respective category. <em>(See line 94).</em> <br />
   */
  selectedCollectionObserver(selectedCollection: Collection) {
    this.router.navigateByUrl('/news/collection/' + selectedCollection.id).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('articles'); // Anchor Link
    });
    this.selectedCollectionSubject.next(selectedCollection); // Trigger the observer to keep watching the Observable: selectedCollection$ | BehaviorSubject now is an observer.
  }


  /**
   * <strong>Collection Route Observer | BehaviorSubject Trigger</strong>. <br />
   * The collectionRouteSubject is an BehaviorSubject Observable that contains a stream of Collection to be observed.  <br />
   * Whenever the observable, <strong>collectionRoute$</strong>, <em>(from newsfeed component)</em>, is called and subscribes to <strong>collectionRouteObserver(data)</strong>, <br />
   * It emits here the value to be observed, <strong>collectionRouteObserver(collectionRoute)</strong>, with <strong>collectionRoute</strong> as the collection ID<br />
   * It then triggers that same BehaviorSubject that now acts as an observer by subscribing to itself : <strong>collectionRouteSubject.next(collectionRoute)</strong> <br />
   * To finally render the articles with their respective collection ID according to the url, <br />
   * Or the whole articles if there is no collection ID set in the url. <em>(See line 99 and 104)</em>.
   */
   collectionRouteObserver(collectionRoute: number | any) {
    this.collectionRouteSubject.next(collectionRoute); // Trigger the observer to keep watching the Observable: collectionRoute$ | BehaviorSubject now is an observer.
  }

}

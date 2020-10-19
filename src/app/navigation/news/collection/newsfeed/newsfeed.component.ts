import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NewsService } from 'src/app/shared/services/news.service';
import { animations, AnimationsService } from 'ngx-animations';
import { Article } from '../../../../shared/classes/article';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent implements OnInit, AfterViewInit {

  articles: Article[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // The fadeInAnimation ref in the html, (#fadeInAnimation), is linked by the ElementRef : newsfeedListingElement
  @ViewChild('fadeInAnimation', { static: false }) newsfeedListingElement: ElementRef;


  // --------------------------- CONSTRUCTOR --------------------------- \\

  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private animationsService: AnimationsService) {
  }

  // --------------------------- OBSERVABLES --------------------------- \\

  collectionRoute$ = this.route.paramMap.pipe(
    map(params => params.get('collectionId')),
  );

  // --------------------------- METHODS --------------------------- \\

  playAnimation() {
    // Add the animation to the fadeInAnimation ref in the html, (#fadeInAnimation), linked here by the elementRef : newsfeedListingElement
    const player = this.animationsService.create(animations.zoomInLeft(1000), this.newsfeedListingElement.nativeElement);
    player.play();
  }

  // --------------------------- LIFECYCLE HOOKS --------------------------- \\

  /**
   * <strong>Collection Route Observer</strong> <br />
   * It render the articles with their respective collection on the page,<br />
   * Each time the collectionRoute is observed in the mappedObservable$.mappedArticles.
   */
  ngOnInit() {
    /* -------------- OBSERVABLES -------------- */
    // Route
    this.collectionRoute$.subscribe(data => this.newsService.collectionRouteObserver(data));
    // Article
    this.newsService.mappedObservable$.subscribe(
      (data) => {
        this.articles = data.mappedArticles;
        this.totalRecords = this.articles.length;
        this.playAnimation();
      },
      err => { console.log(err); }
    );
  }

  ngAfterViewInit(): void {
    this.playAnimation();
  }

}

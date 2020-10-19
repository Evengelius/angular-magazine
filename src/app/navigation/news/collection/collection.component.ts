import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/shared/classes/collection';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  collections: Collection[];

  // Animation
  show = true;

  // --------------------------- CONSTRUCTOR --------------------------- \\

  constructor(private newsService: NewsService) {
  }

  // --------------------------- METHODS --------------------------- \\

  // EventEmitter | On Collection Selected | SideBar
  onSelectedCollection(selectedCollection: Collection) {
    this.newsService.selectedCollectionObserver(selectedCollection);
  }

  // --------------------------- LIFECYCLE HOOKS --------------------------- \\

  ngOnInit() {
    /* -------------- OBSERVABLES -------------- */
    this.newsService.mappedObservable$.subscribe(
      (data) => {
        this.collections = data.mappedCollection;
      },
      err => { console.log(err); }
    );
  }

}

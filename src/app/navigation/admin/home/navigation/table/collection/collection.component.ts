import { Component, OnInit } from '@angular/core';
import { Collection } from '../../../../../../shared/classes/collection';
import { CollectionService } from '../../../../../../shared/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // Collection List
  collections: Collection[] = [];
  filteredCollection: Collection[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private collectionService: CollectionService) { }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCollection = this.filteredCollection ? this.performFilter(this.listFilter) : this.collections;
  }

  // Filtering | Method
  performFilter(filterBy: string): Collection[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.collections.filter((collection: Collection) => collection.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.collectionService.findAll()
      .subscribe(
        (collections) => {
          this.collections = collections;
          this.filteredCollection = this.collections;
          this.totalRecords = this.filteredCollection.length;
        },
        err => { console.log(err); }
      );
  }
}

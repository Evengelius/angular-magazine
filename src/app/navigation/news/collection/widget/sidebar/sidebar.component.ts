import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/shared/classes/collection';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() collections: Collection[]
  @Output() selected =  new EventEmitter<Collection>()
  selectedCollection: Collection|any;

  constructor() { }

  ngOnInit() {
  }

  onClickCollection(collection: Collection) {
    this.selectedCollection = collection;
    this.selected.emit(collection);
  }

}

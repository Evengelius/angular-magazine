import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../../../shared/classes/image';
import { ImageService } from '../../../../../../shared/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  // Image List
  images: Image[] = [];
  filteredImage: Image[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private imageService: ImageService) { }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredImage = this.filteredImage ? this.performFilter(this.listFilter) : this.images;
  }

  // Filtering | Method
  performFilter(filterBy: string): Image[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.images.filter((image: Image) => image.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.imageService.findAll()
      .subscribe(
        (images) => {
          this.images = images;
          this.filteredImage = this.images;
          this.totalRecords = this.filteredImage.length;
        },
        err => { console.log(err); }
      );
  }
}

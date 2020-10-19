import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../../../shared/classes/comment';
import { CommentService } from '../../../../../../shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  // Comment List
  comments: Comment[] = [];
  filteredComment: Comment[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private commentService: CommentService) { }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredComment = this.filteredComment ? this.performFilter(this.listFilter) : this.comments;
  }

  // Filtering | Method
  performFilter(filterBy: string): Comment[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.comments.filter((comment: Comment) => comment.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.commentService.findAll()
      .subscribe(
        (comments) => {
          this.comments = comments;
          this.filteredComment = this.comments;
          this.totalRecords = this.filteredComment.length;
        },
        err => { console.log(err); }
      );
  }
}

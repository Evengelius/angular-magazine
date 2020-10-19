import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../../../shared/classes/article';
import { ArticleService } from '../../../../../../shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  // User List
  articles: Article[] = [];
  filteredArticle: Article[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private articleService: ArticleService) { }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredArticle = this.filteredArticle ? this.performFilter(this.listFilter) : this.articles;
  }

  // Filtering | Method
  performFilter(filterBy: string): Article[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.articles.filter((article: Article) => article.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.articleService.findAll()
      .subscribe(
        (articles) => {
          this.articles = articles;
          this.filteredArticle = this.articles;
          this.totalRecords = this.filteredArticle.length;
        },
        err => { console.log(err); }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { Article } from '../../shared/classes/article';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];

  // Animation
  show = true;

  // HTTP Error Response
  errorMessage: string;

  constructor(public articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.findAll()
      .subscribe(
        (articles) => {
          this.articles = articles;
        },
        err => this.errorMessage = err
      );
  }

}

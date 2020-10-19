import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/classes/article';

@Component({
  selector: 'app-newsfeed-article',
  templateUrl: './newsfeed-article.component.html',
  styleUrls: ['./newsfeed-article.component.scss']
})
export class NewsfeedArticleComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {
  }

}

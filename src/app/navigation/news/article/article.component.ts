import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../shared/classes/article';
import { ArticleService } from '../../../shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;
  id: number;

  // Animation
  show = true;

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // HTTP Error Response
  errorMessage: string;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id

      this.articleService.findOneBy(this.id)
        .subscribe(
          (data) => {
            this.article = data;
            this.totalRecords = this.article.comments.length;
          },
          (err) => {
            this.errorMessage = err
          }
        );
    });
  }
}

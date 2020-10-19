import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../shared/classes/article';
import { ArticleService } from '../shared/services/article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleInvalidGuard implements CanActivate {

  // Article List
  articles: Article[] = [];


  // HTTP Error Response
  errorMessage: string;

  constructor(private router: Router, private articleService: ArticleService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // I want to get the number of articles
    this.articleService.findAll()
      .subscribe(
        (articles) => {
          this.articles = articles;
          /**
           * news/article/:id
           *         0     1
           * To know which url we need to extract,
           * We need to check the routing module where this service guard is set : news-routing.
           * And there, we see that news/article/":id" ,
           * is on the "1" parameter of the url.
           *
           * Since so, we then get the first parameter: 1 => next.url[1]
           */
          // console.log(this.articles.length);
          // console.log(next.url[1]);

          const id = +next.url[1].path;
          if (isNaN(id) || id < 1 || id > this.articles.length) {
            this.router.navigate(['error']);
            return false;
          }
        },
      );
    return true;
  }

}

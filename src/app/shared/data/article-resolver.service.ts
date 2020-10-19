import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Article } from '../classes/article';
import { ArticleService } from '../services/article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<Article> {

  public article: Article;

  constructor(private router: Router, public articleService: ArticleService) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.articleService.findOneBy(route.params.slug).subscribe(article => {
      if (!article) { // When empty redirect 404
        this.router.navigateByUrl('/home', {skipLocationChange: true});
      } else {
        this.article = article;
      }
    });
    return this.article;
  }
}

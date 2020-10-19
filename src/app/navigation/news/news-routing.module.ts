import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { CollectionComponent } from './collection/collection.component';
import { NewsfeedComponent } from './collection/newsfeed/newsfeed.component';
import { ArticleComponent } from './article/article.component';
import { CollectionInvalidGuard } from '../../guard/collection-invalid.guard';
import { ArticleInvalidGuard } from '../../guard/article-invalid.guard';
import { AuthGuard } from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'collection',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: 'collection',
        component: CollectionComponent,
        children: [
            {
              path: '',
              component: NewsfeedComponent
            },
            {
              path: ':collectionId',
              canActivate: [CollectionInvalidGuard],
              component: NewsfeedComponent
            }
        ]
      },
      {
        path: 'article/:id',
        canActivate: [ArticleInvalidGuard, AuthGuard],
        component: ArticleComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }

export const routingComponent = [CollectionComponent, NewsfeedComponent, ArticleComponent];

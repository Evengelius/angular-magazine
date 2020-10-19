import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule, routingComponent } from './news-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NewsComponent } from './news.component';
import { CarouselNewsComponent } from './collection/widget/carousel/carousel-news.component';
import { SidebarComponent } from './collection/widget/sidebar/sidebar.component';
import { NewsfeedArticleComponent } from './collection/newsfeed/widget/article/newsfeed-article.component';
import { CommentComponent } from './article/widget/comment/comment.component';
import { CommentFormComponent } from './article/widget/comment-form/comment-form.component';


@NgModule({
  declarations: [
    // Main | Routing
    NewsComponent,
    // Collection | Widget
    CarouselNewsComponent,
    NewsfeedArticleComponent,
    SidebarComponent,
    // Article | Widget
    CommentComponent,
    CommentFormComponent,
    // Routing
    routingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule
  ],
})
export class NewsModule { }

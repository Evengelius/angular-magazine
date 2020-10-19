import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './home/admin.component';
import { UserComponent } from './home/navigation/table/user/read/all/user.component';
import { UserOneComponent } from './home/navigation/table/user/read/one/user-one.component';
import { UserCreateComponent } from './home/navigation/table/user/create/user-create.component';
import { UserEditComponent } from './home/navigation/table/user/edit/user-edit.component';
import { ArticleComponent } from './home/navigation/table/article/article.component';
import { CollectionComponent } from './home/navigation/table/collection/collection.component';
import { CommentComponent } from './home/navigation/table/comment/comment.component';
import { ImageComponent } from './home/navigation/table/image/image.component';
import { UserInvalidGuard } from './guard/user-invalid.guard';
import { UserEditGuard } from './guard/user-edit.guard';
import { UserCreateGuard } from './guard/user-create.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      // Articles
      {path: 'articles', component: ArticleComponent},
      // Collection
      {path: 'collections', component: CollectionComponent},
      // Comments
      {path: 'comments', component: CommentComponent},
      // Images
      {path: 'images', component: ImageComponent},
      // Users
      {path: 'users', component: UserComponent},
      {path: 'users/create', component: UserCreateComponent, canDeactivate: [UserCreateGuard]},
      {path: 'users/show/:id', canActivate: [UserInvalidGuard], component: UserOneComponent},
      {path: 'users/edit/:id', canActivate: [UserInvalidGuard], canDeactivate: [UserEditGuard], component: UserEditComponent},
    ],
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
export class AdminRoutingModule { }

export const routingComponent =
  [
    ArticleComponent, CollectionComponent, CommentComponent, ImageComponent,
    UserComponent, UserCreateComponent, UserOneComponent, UserEditComponent
  ];

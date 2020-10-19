import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../shared/classes/user';
import { UserService } from '../../../shared/services/authentication/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInvalidGuard implements CanActivate {

  // Article List
  users: User[] = [];


  // HTTP Error Response
  errorMessage: string;

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // I want to get the number of users
    this.userService.findAll()
      .subscribe(
        (users) => {
          this.users = users;
          /**
           * dashboard/users/show|edit/:id
           *             0       1      2
           * To know which url we need to extract,
           * We need to check the routing module where this service guard is set : admin-routing.
           * And there, we see that dashboard/users/users|edit/":id" ,
           * is on the "2" parameter of the url.
           *
           * Since so, we then get the second parameter: 2 => next.url[2]
           */
          // console.log(this.users.length);
          // console.log(next.url[2]);

          const id = +next.url[2].path;
          if (isNaN(id) || id < 1) {
            this.router.navigate(['error']);
            return false;
          }
        },
      );
    return true;
  }

}

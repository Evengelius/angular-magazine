import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationStorageService } from '../shared/services/authentication/authentication-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authenticationStorageService: AuthenticationStorageService, private router: Router) {
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (
        this.authenticationStorageService.retrieveUserFromSessionStorage() &&
        this.authenticationStorageService.retrieveUserFromSessionStorage().role == 'ROLE_ADMIN'
       ) { return true; }

    // Not logged in, so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

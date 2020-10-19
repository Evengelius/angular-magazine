import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from '../shared/classes/collection';
import { CollectionService } from '../shared/services/collection.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionInvalidGuard implements CanActivate {

  collections: Collection[] = [];

  constructor(private router: Router, private collectionService: CollectionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // I want to get the number of collections
    this.collectionService.findAll()
      .subscribe(
        (collections) => {
          this.collections = collections;
          /**
           * news/collection
           *           0
           * news/collection/:id
           *           0      0
           * To know which url we need to extract,
           * We need to check the routing module where this service guard is set : news-routing.
           * And there, we see that both news/"collection" + news/"collection/:id" ,
           * are on the "0" parameter of the url.
           *
           * Since so, we then get the first parameter: 0 => next.url[0]
           */
          // console.log(this.collections.length);
          // console.log(next.url[0]);

          const id = +next.url[0].path;
          if (isNaN(id) || id < 1 || id > this.collections.length) {
            this.router.navigate(['error']);
            return false;
          }
        }
      );

    return true;
  }

}

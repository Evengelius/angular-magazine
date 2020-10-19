import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationStorageService } from './authentication-storage.service';

const AUTHORIZATION_HEADER = 'Authorization'; // for Spring Boot back-end

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private authenticationStorageService: AuthenticationStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token
    const token = this.authenticationStorageService.retrieveUserFromSessionStorage().token;

    /**
     * If the token exist,
     * Clone it inside Authorization header : Bearer(space)token
     * As done in Postman manually
     */
    if (token != null) {
      const cloned = request.clone({
        headers: request.headers.set(AUTHORIZATION_HEADER, `Bearer ${token}`)
      });
      // Continue the request
      return next.handle(cloned);
    } else {
      /**
       * Else, if the token is not valid or doesn't exist,
       * Forward simply the request as it is : so without storing it in the Authorization header
       */
      return next.handle(request);
    }
  }
}

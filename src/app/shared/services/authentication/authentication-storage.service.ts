import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStorageService {

  private user: any;

  constructor() {}

  // ********************  Retrieve | Token & Role ******************* //
  public retrieveUserFromSessionStorage(): any {
    this.user = {
      token: sessionStorage.getItem('token'), // Used in Interceptor
      // @ts-ignore
      role: JSON.parse(sessionStorage.getItem('role')), // Used in Admin Guard
    };
    return this.user;
  }

  // ******************** Authenticated | User ******************* //

  isAuthenticated(): string | null  {
    return sessionStorage.getItem('token');
  }

  // ******************** Admin | User ******************* //
  isAdmin(): boolean {
    // @ts-ignore
    return sessionStorage.getItem('role').includes('ROLE_ADMIN');
  }
}

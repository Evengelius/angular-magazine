import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { User } from '../../classes/user';
import { Register } from '../../classes/auth/register';
import { Login } from '../../classes/auth/login';
import { AuthenticationResponse } from '../../classes/auth/payload/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8070/api/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  // ****************************** METHODS | CRUD ****************************** //

  /* ************ Find | All ************** */
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  /* ******** Find | One | By Id ********** */
  findOneBy(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /* *************** Store **************** */
  register(user: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseUrl}`, user, this.httpOptions).pipe(
      tap(() => console.log(`A new user has been registered`))
    );
  }

  /* ************** Update **************** */
  update(id: number, user: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(() => console.log(`The user with the id ${id}, has been updated`))
    );
  }

  /* ************** Destroy *************** */
  destroy(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(() => console.log(`The user with the id ${id}, has been deleted`))
    );
  }

  // ****************************** AUTHENTICATION ****************************** //

  /* **************** Login **************** */
  login(login: Login): Observable<boolean> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`, login).pipe(
      map((data) => {
        window.sessionStorage.setItem('token', data.token);
        window.sessionStorage.setItem('name', data.name);
        window.sessionStorage.setItem('firstname', data.firstname);
        window.sessionStorage.setItem('username', data.username);
        window.sessionStorage.setItem('email', data.email);
        window.sessionStorage.setItem('role', JSON.stringify(data.role));

        console.log(sessionStorage.getItem('token'));
        return true;
      })
    );
  }

  /* ************** Logout **************** */
  logout(): void {
    window.sessionStorage.clear();
  }
}

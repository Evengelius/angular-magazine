import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../classes/article';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './miscellaneous/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ErrorHandlerService {

  private baseUrl = 'http://localhost:8070/api/articles';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  findOneBy(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}

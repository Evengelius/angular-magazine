import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../classes/comment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './miscellaneous/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ErrorHandlerService {

  private baseUrl = 'http://localhost:8070/api';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments`).pipe(
      catchError(this.handleError)
    );
  }

  store(id: number, comment: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/articles/${id}/comments`, comment, this.httpOptions);
  }
}

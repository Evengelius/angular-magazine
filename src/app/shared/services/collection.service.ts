import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './miscellaneous/error-handler.service';
import { Collection } from '../classes/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends ErrorHandlerService {

  private baseUrl = 'http://localhost:8070/api/collections';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
}

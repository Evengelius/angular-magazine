import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './miscellaneous/error-handler.service';
import { Image } from '../classes/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ErrorHandlerService {

  private baseUrl = 'http://localhost:8070/api/images';

  constructor(private http: HttpClient) {
    super();
  }

  findAll(): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
}

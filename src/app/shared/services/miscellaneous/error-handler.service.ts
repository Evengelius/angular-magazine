import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  protected handleError(httpErrorResponse: HttpErrorResponse) {

    let errorMessage = '';
    if (httpErrorResponse.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `An error has occured: ${httpErrorResponse.error.message}`;
    } else {
      // server-side error
      errorMessage = `The server has returned the code : ${httpErrorResponse.status},\nThe message error is : ${httpErrorResponse.message}`;
    }
    // Log the error message in the console
    console.log(errorMessage);
    // Return the error message
    return throwError(errorMessage);
  }

}

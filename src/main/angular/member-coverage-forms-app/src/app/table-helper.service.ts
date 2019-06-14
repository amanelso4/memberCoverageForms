import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormInt } from "../assets/formInt";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TableHelperService {

  constructor(
    private http: HttpClient
  ) { }

  //////////////////
  // DECLARATIONS //
  //////////////////

  private formUrl: string = "api/forms";

  //////////////////
  ///// METHODS ////
  //////////////////

  //Gets forms using HttpClient service
  getForms() {
    return this.http.get<FormInt[]>(this.formUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //Deletes a form based on the provided formId
  delete(formId: number): Observable<{}> {
    const url = this.formUrl + '/' + formId; // delete api/forms/formId
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Taken from angular http guide, handles errors for requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

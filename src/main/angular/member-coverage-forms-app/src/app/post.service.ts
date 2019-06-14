import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { Form} from './form';

import { Observable, throwError, from, of } from 'rxjs';
import { catchError, retry, map, tap, filter } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})

export class PostService {

  private formsUrl: string='api/forms';


  constructor(
    private http: HttpClient
  ) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //** POST FUNCTION

  addForm (form: Form): Observable<Form> {
    return this.http.post<Form>(this.formsUrl, form, httpOptions).pipe(

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

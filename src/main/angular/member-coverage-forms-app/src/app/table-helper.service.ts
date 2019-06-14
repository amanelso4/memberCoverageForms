import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormInt } from "../assets/formInt";

import { Observable, throwError, from, of } from 'rxjs';
import { catchError, retry, map, tap, filter } from "rxjs/operators";
import {Form} from "./form";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})


export class TableHelperService {

 private formUrl: string = "api/forms";


  constructor(
    private http: HttpClient
  ) { }

  getForms() {
    return this.http.get<FormInt[]>(this.formUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  getFilteredForms() {
    return this.http.get<FormInt[]>(this.formUrl)
      .pipe(map(data => {
        return data.filter(datum => {
          return datum.state == 'KS' || datum.state == 'AZ';
        });
      }));
  }

  //** POST FUNCTION

  addForm (form: Form): Observable<FormInt> {
    return this.http.post<FormInt>(this.formUrl, form, httpOptions).pipe(

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

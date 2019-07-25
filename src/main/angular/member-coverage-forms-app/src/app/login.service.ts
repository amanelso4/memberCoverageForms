import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Form} from "./form.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login: boolean = true;
  private formUrl: string = "/MemberCoverageForms/api/login";

  callLogin(username: string, password: string) : Observable<boolean> {
    let loginDetails = {
      username: username,
      password: password,
    };
    return this.http.post<boolean>(this.formUrl, loginDetails, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Taken from angular http guide, handles errors for requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly
      console.error('A client side error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        'Backend returned code ' + error.status +
        ', body was: ' + error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(
    private http: HttpClient,
  ) { }
}

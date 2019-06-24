import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

export class Form {
  id: number;
  coverageType: string;
  state: string [];
  sourceSystem: string;
  formType: string;
  name: string;
  link: string;
  description: string;
  formId: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

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

  /// GETTERS ///

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getSingleForm(id: number): Observable<Form> {
    return this.http.get<Form>(`${this.formUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /// EDITING DATABASE ///

  // POST
  addForm(form: Form): Observable<Form> {
    return this.http.post<Form>(this.formUrl, form, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // PUT
  updateForm(form: Form): Observable<{}> {
    return this.http.put(`${this.formUrl}/${form.id}`, form, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // DELETE
  deleteForm(id: number): Observable<{}> {
    return this.http.delete(`${this.formUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /// ERROR HANDLING ///

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
        ', body was: ' + error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

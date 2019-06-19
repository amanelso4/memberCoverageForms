/* TODO: combine this service and Amanda's Post Service into a single service for whole application */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Form } from "./form";
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
  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.formUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  save(form: Form) : Observable<Form> { /*TODO: collapse this function into Amanda's post function */
    if (form.id === null) {
      return this.http.post<Form>(this.formUrl, form, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
    } else {

    }
  }


  /*FROM THE VIDEO GUY'S CREATE-EMPLOYEE COMPONENT
    saveEmployee(): void {
      this.employeeService.save(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        }
      );
    }
   */

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

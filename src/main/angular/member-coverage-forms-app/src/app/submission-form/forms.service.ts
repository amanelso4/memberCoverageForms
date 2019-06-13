import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../form';
//**import { catchError } from 'rxjs/operators';
//**import { HttpErrorHandler, HandleError } from '../http-error-handler.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class FormsService {
formsUrl = 'api/forms';
 //** private handleError: HandleError;

  constructor(
   private http: HttpClient,
   ) {}
  //** httpErrorHandler: HttpErrorHandler) {
  //**  this.handleError = httpErrorHandler.createHandleError('HeroesService');


  /** GET forms from the server */
  getForms (): Observable<Form[]> {
    return this.http.get<Form[]>(this.formsUrl)
      .pipe(
  //**      catchError(this.handleError('getForms', []))
      )
  }

  /* GET heroes whose name contains search term */
  searchForms(term: string): Observable<Form[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Form[]>(this.formsUrl, options)
      .pipe(
  //**      catchError(this.handleError<Form[]>('searchForms', []))
      );
  }

//**ADD
  addForm(form: Form): Observable<Form> {
    return this.http.post<Form>(this.formsUrl, form, httpOptions).pipe(
 //**     catchError(this.handleError('addForm', form)

      );
  }

//**DELETE
  deleteForm(id: number): Observable<{}> {
    const url = `${this.formsUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
 //**       catchError(this.handleError('deleteForm'))
      );
  }

//PUT
  updateForm(form: Form): Observable<Form> {
    return this.http.put<Form>(this.formsUrl, form, httpOptions)
      .pipe(
   //**     catchError(this.handleError('updateForm', form))
      );
  }
}


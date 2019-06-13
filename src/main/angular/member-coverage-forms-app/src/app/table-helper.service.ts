import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormInt } from "../assets/formInt";

@Injectable({
  providedIn: 'root'
})
export class TableHelperService {

  formUrl: string; //Need to give this an actual value

  constructor(
    private http: HttpClient
  ) { }

  getForms() {
    return this.http.get<FormInt>(this.formUrl);
  }
}

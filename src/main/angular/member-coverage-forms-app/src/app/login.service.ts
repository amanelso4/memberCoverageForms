import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login: boolean = false;
  public count: number =0;


  constructor() { }
}

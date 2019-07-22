import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private login: LoginService,
    private http: HttpClient,
    private router: Router,
  ){
    this.login.authenticate(undefined, undefined);
  }

  title = 'Member Coverage Forms Application';

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

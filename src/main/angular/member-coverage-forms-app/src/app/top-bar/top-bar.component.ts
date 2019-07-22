import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { LoginService } from "../login.service";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    public router: Router, // Included so that button can be disappeared on add form page
    public loginService: LoginService,
    public http: HttpClient,
  ) { }

  //FontAwesome Icons for use on button
  faPlusCircle = faPlusCircle;

  ngOnInit() {
  }

  logout() {
    this.http.post('logout', {}).finally(() => {
      this.login.authenticated = false;
      this.router.navigateByUrl('/login');
    }).subscribe();
  }

}

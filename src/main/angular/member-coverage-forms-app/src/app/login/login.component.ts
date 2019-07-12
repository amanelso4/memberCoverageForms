import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  username=false;
  password = false;
  usernameCheck(usernameCheck) {
    if(usernameCheck.isEqual('sunlife')) {
      this.username = true;
    }
  }
 passwordCheck(passwordCheck) {
    if(passwordCheck.isEqual('sunlife')) {
      this.password = true;
    }
  }

  submissionCheck() {
    if(this.username === true && this.password == true) {
      this.submitted = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Form, FormService } from "../form.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  //////////////////
  // DECLARATIONS //
  //////////////////

  forms: Form[];

  //Login Page Controls
  model: FormGroup;
  error = false;

  // controls when dropdown options are updated
  initialGetForms: boolean;

  // controls loading symbol
  public isLoading: boolean;

  // search fields
  formType: string = '';
  coverageType: string = '';
  state: string = '';
  sourceSystem: string = '';
  formNumber: string = '';
  name: string = '';

  // dropdown options
  coverageTypesVar: string[] = [];
  sourceVar: string[] = [];
  formTypeVar: string[] = [];
  statesVar = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];


  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    this.initialGetForms = true;
    this.loadUp();

    this.model = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      mongoEnvironment: [null, Validators.required],
    });
  }

  //Validates that Username & Password is correct and sets count to never show page again
  checkLogin(username, password) {
    this.loginService.callLogin(username, password).subscribe(
      (success: boolean) => {
        console.log('Attempted login with username ' + username + ' and password ' + password);
        if (success) {
          this.loginService.login = false;
          this.getForms();
        } else {
          this.error = true;
        }
      }
    );
    /*if(userName === "admin" && passWord === "sunlife") {
      this.loginService.count = this.loginService.count + 1;
      this.loginService.login = false;
      this.getForms();
      this.loginService.count = this.loginService.count + 1;
    }
    else {
      this.error = true;
    }*/
  }

  loadUp() {
    if (this.loginService.login == false) {
      this.getForms();
    }
  }

  // Clear the currently selected filters
  clearFilters() {
    this.formType = '';
    this.coverageType = '';
    this.state = '';
    this.name = '';
    this.sourceSystem = '';
    this.formNumber = '';
  }

  // Retrieve updated forms after a delete call
  getForms() {
    this.isLoading = true;
    this.formService.getForms().subscribe( forms => {
      this.forms = forms;
      if (this.initialGetForms) { // only retrieve dropdown options on initial getForms()
        this.updateDropdownOptions();
        this.initialGetForms = false;
      }
      //Determines if Login page needs to appear upon load-up
      this.isLoading = false;
    });
  }

  // Retrieve dropdown menu options from local forms
  updateDropdownOptions() {
    console.log('updating dropdown options');
    for (let form of this.forms) {
      if (!this.coverageTypesVar.includes(form.coverageType)) {
        this.coverageTypesVar.push(form.coverageType);
      }
      if (!this.sourceVar.includes(form.sourceSystem)) {
        this.sourceVar.push(form.sourceSystem);
      }
      if (!this.formTypeVar.includes(form.formType)) {
        this.formTypeVar.push(form.formType);
      }
    }
    // alphabetize retrieved dropdown options
    this.coverageTypesVar.sort((a, b) => {return a < b ? -1 : 1});
    this.sourceVar.sort((a, b) => {return a < b ? -1 : 1});
    this.formTypeVar.sort((a, b) => {return a < b ? -1 : 1});
  }

  // Delete a form by providing the form's id as an argument
  deleteForm(formNumber: string) {
    this.formService.deleteForm(formNumber).subscribe(() => {
      console.log('Form w/ formNumber ' + formNumber + ' deleted');
      this.getForms();
    });
  }

}

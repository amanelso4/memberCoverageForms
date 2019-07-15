import { Component, OnInit } from '@angular/core';
import { Form, FormService } from "../form.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formIdValidation} from "../submission-form/formIdValidation.directive";
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

  //controls login page
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
  formId: string = '';
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
    this.getForms();

    this.model = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  checkLogin(userName, passWord) {
    if(userName === "sunlife" && passWord === "sunlife") {
      this.loginService.login = false;
    }
    else {
      this.error = true;
    }
    this.loginService.count = this.loginService.count + 1;
  }

  // Clear the currently selected filters
  clearFilters() {
    this.formType = '';
    this.coverageType = '';
    this.state = '';
    this.name = '';
    this.sourceSystem = '';
    this.formId = '';
  }

  // Retrieve updated forms after a delete call
  getForms() {
    this.isLoading = true;
    this.formService.getForms().subscribe( forms => {
      this.forms = forms;
      if (this.initialGetForms) { // only retrieve dropdown options on initial getForms()
        this.updateDropdownOptions();
        this.loginService.login = true;
        this.initialGetForms = false;
      }
      if (this.loginService.count === 0) {
        this.loginService.login = true;
      }
      else {
        this.loginService.login = false;
      }
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
  deleteForm(formId: string) {
    this.formService.deleteForm(formId).subscribe(() => {
      console.log('Form w/ formId ' + formId + ' deleted');
      this.getForms();
    });
  }

}

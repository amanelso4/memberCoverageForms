import {Component, OnInit} from '@angular/core';
import { Form, FormService } from "../form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PDFDocumentProxy } from "pdfjs-dist";
import { tap } from 'rxjs/operators';
import { formNumberValidation } from "./formNumberValidation.directive";
import {LoginService} from "../login.service";


/*
   This file contains the methods and declarations that drive the submission-form component of the Member Form Manager
   Application. This component is also the update page, as well as the confirmation page. These pages in the application
   are what captures the information that will be used to update the Mongo database.

   @version       1.0 02 July 2019
   @authors       Amanda Nelson & Evan Trout
   @mentors       Jon Carter & Steven Kouri
 */

@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css'],
})

export class SubmissionFormComponent implements OnInit{

  //Getters that allow the Validators the check if Valid
  get formType() {return this.model.get('formType')}
  get coverageType() {return this.model.get('coverageType')}
  get state() {return this.model.get('state')}
  get sourceSystem() {return this.model.get('sourceSystem')}
  get name() {return this.model.get('name')}
  get formNumber() {return this.model.get('formNumber')}
  get link() {return this.model.get('link')}
  get description() {return this.model.get('description')}


  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
  ) { }

  //////////////////
  // DECLARATIONS //
  //////////////////

  form: Observable<Form>;
  model: FormGroup;
  newForm = false;
  originalForm: Form;
  originalFormNumber: string;
  forms: Form[];
  initialGetForms: boolean;
  coverageTypesVar: string[] = [];
  sourceVar: string[] = [];
  formTypeVar: string[] = [];
  formNumbers: string[] = [];

  addNewCoverageType: boolean = false;
  addNewFormType: boolean = false;
  addNewSource: boolean = false;

  submitted = false; //controls Submission Page and Confirmation Page
  view = false; //Controls PDF-Viewer
  valid = true; //Controls Validators
  duplicate = false; //Controls Duplicate Validator
  testLink = false; //Controls Link Validator
  testFormNumber = false; //Controls formNumber validator
  loginError = false;
  regexp;
  formNumberRegexp;
  public isLoading: boolean;

  //
  page: any = 1;
  pageTotal: any;
  dropdownSettings = {};
  message = String(); //Validation Message
  formNumberMessage: string = String();

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    //set drop down settings
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'coverage',
      itemsShowLimit: 5,
      allowSearchFilter: false,
      enableCheckAll: true,
      selectAllText: 'Select All States',
      unSelectAllText: 'Deselect All States'
    };

    this.initialGetForms = true;
    this.getForms();

    // Initialize form to blank values
    this.model = this.formBuilder.group({
      coverageType: [null, Validators.required],
      state: [null, Validators.required],
      sourceSystem: [null, Validators.required],
      formType: [null, Validators.required],
      name: [null, Validators.required],
      link: [null, Validators.required],
      description: [null, Validators.required],
      formNumber: [null, [Validators.required, formNumberValidation(/new/i)]]
    });

    // Get form number from active route and determine if this is a new form or an existing one
    this.route.paramMap.subscribe(parameterMap => {
      this.originalFormNumber = parameterMap.get('formNumber');
      if (this.originalFormNumber != "new") {
        // Existing form
        this.getForm(this.originalFormNumber);
      } else {
        // New form
        this.newForm = true;
      }
    });
  }

  checkCoverageType(): void {
    if (this.model.value.coverageType == "newCovOption") {
      this.model.controls['coverageType'].setValue('');
      this.addNewCoverageType = true;
    }
  }

  checkFormType(): void {
    if (this.model.value.formType == "newFormOption") {
      this.model.controls['formType'].setValue('');
      this.addNewFormType = true;
    }
  }

  checkSource(): void {
    if (this.model.value.sourceSystem == "newSourceOption") {
      this.model.controls['sourceSystem'].setValue('');
      this.addNewSource = true;
    }
  }

  // Retrieve the form the user wants to update and populate the page with its details
  private getForm(formNumber: string) {
    this.isLoading = true;
    this.form = this.formService.getSingleForm(formNumber).pipe(
      tap(form => this.model.patchValue(form))
    )
    this.formService.getSingleForm(formNumber).subscribe(form => {
      this.originalForm = form;
      // handle error where no form matching formNumber found
      if (this.originalForm.formNumber == null) {
        console.warn("Form with formNumber " + formNumber + " not found.");
        this.newForm = true;
        this.model.value.formNumber = formNumber;
      }
    })
  }


  //Get all forms to check through and Update the drop-down options from
  getForms() {
    this.isLoading = true;
    this.formService.getForms().subscribe( forms => {
      this.forms = forms;
      if (this.initialGetForms) { // only retrieve dropdown options on initial getForms()
        this.updateDropdownOptions();
        this.initialGetForms = false;
      }
      if(this.loginService.login === true) {
        this.loginError = true;
      }
    });
  }

  // Retrieve dropdown menu options from local forms
  updateDropdownOptions() {
    console.log('updating dropdown options');
    this.isLoading = true;
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
      if (!this.formNumbers.includes(form.formNumber)) {
        this.formNumbers.push(form.formNumber);
      }
    }
    this.coverageTypesVar.sort((a, b) => {return a < b ? -1 : 1});
    this.sourceVar.sort((a, b) => {return a < b ? -1 : 1});
    this.formTypeVar.sort((a, b) => {return a < b ? -1 : 1});
    this.isLoading = false;
  }

  // POST or PUT submitted form depending on form number
  submit() {
    this.isLoading = true;
    // If adding a new form, call a POST
    if (this.newForm) {
      const createdForm: Form = Object.assign({}, this.model.value);
      this.formService.addForm(createdForm).subscribe(
        (data: Form) => {
          console.log('Added form: ');
          console.log(data);
          this.isLoading = false;
       this.router.navigate(['']);
        }
      );

      //If updating an existing form, call a PUT
    } else {
      const updatedForm: Form = Object.assign({}, this.model.value);
      this.formService.updateForm(this.originalFormNumber, updatedForm).subscribe(
        () => {
          console.log('Updated form w/ number' + this.model.value.formNumber);
          console.log(updatedForm);
          this.isLoading = false;
          this.router.navigate(['']);
        }
      )
    }
  }

  submitAnother() {
    this.isLoading = true;
    // If adding a new form, call a POST
    if (this.newForm) {
      const createdForm: Form = Object.assign({}, this.model.value);
      this.formService.addForm(createdForm).subscribe(
        (data: Form) => {
          console.log('Added form: ');
          console.log(data);
          this.isLoading = false;
        }
      )
    }
  }


      //PDF Viewer functions to have pagination
  callBackFn(pdf: PDFDocumentProxy) {
    this.pageTotal = pdf.numPages;
  }

/* nextPage() {
    if(this.page < this.pageTotal) {
      this.page = this.page + 1;
    }
  }

  prevPage() {
    if(this.page > 1) {
      this.page = this.page - 1;
    }
  }*/

  //Validation that form is correct before moving on to Confirmation Page Methods
  submissionCheck() {
    if(this.model.invalid || this.testLink === true || this.testFormNumber === true) {
      this.submitted = false;
      this.valid = false;
    }
    else {
      this.submitted = true;
    }
  }

  duplicateCheck(modelNumber) {
    if (this.formNumbers.includes(modelNumber) && this.newForm === true) {
      this.duplicate = true;
      this.valid = false;
      this.submitted = false;
      this.message = "You are trying to submit a form that already exists in the database. Please change the Form Number value to submit, " +
        "or navigate back to the Table page and search for this Form Number to edit this form's information."
    }
  }

//Source for the Regex statement: https://gist.github.com/dperini/729294
  linkCheck(triggerLink) {
    this.regexp = new RegExp("^" +
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      "(?:" +
      "(?:" +
      "[a-z0-9\\u00a1-\\uffff]" +
      "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
      ")?" +
      "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" +
      "$", "i"
    );
    if(this.regexp.test(triggerLink)===false)
    {
      this.testLink = true;
      this.message = "Link is not valid."
    }
    else {
      this.testLink = false;
    }
  }

  //Source for the Regex statement: https://gist.github.com/dperini/729294
  formNumberCheck(triggerFormNumber) {
    this.formNumberRegexp = new RegExp("^[a-zA-Z0-9_-]+$");
    if(this.formNumberRegexp.test(triggerFormNumber)===false)
    {
      this.testFormNumber = true;
      this.formNumberMessage = "Form Number is not valid."
    }
    else {
      this.testFormNumber = false;
    }
  }

  //State Multi-select drop-down
  stateList: string[] = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];
  coveragesItems = [];
  coverageStates = [];
  selectedStates = [];

  updateState(): void {
    let tempArray = [];
    this.selectedStates.forEach((item) => tempArray.push(item.coverage));
    this.coverageStates.length = 0;
    this.coverageStates = tempArray;
  }

  onSelectAll(): void {
    let tempArray = [];
    this.coveragesItems.forEach((item) => tempArray.push(item.coverage));
    this.coverageStates.length = 0;
    this.coverageStates = tempArray;
  }

  onDeSelectAll(): void {
    let tempArray = [];
    this.coverageStates.length = 0;
    this.coverageStates = tempArray;
  }

  //EXTRA
  egg = false; // ;)
  easterEgg(name: string) {
    if (name==='amanda.x.nelson') {
      this.egg=true;
      this.message = "Hello there my friend, this is amanda.x.nelson. I like to computer program and I am an intern at Sun Life.\n"
    }
  }
}

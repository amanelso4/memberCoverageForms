import {Component, Input, OnInit} from '@angular/core';
import { Form, FormService } from "../form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PDFDocumentProxy, PDFPromise, PDFProgressData, PDFJS } from "pdfjs-dist";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css'],
})

export class SubmissionFormComponent implements OnInit{

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  //////////////////
  // DECLARATIONS //
  //////////////////

  form: Observable<Form>;
  model: FormGroup;
  private _pdf: PDFDocumentProxy;
  newForm = false;
  originalForm: Form;
  originalFormId: string;
  forms: Form[];
  initialGetForms: boolean;

  formType: string = '';
  coverageType: string = '';
  state: string = '';
  sourceSystem: string = '';
  formId: string = '';
  name: string = '';

  coverageTypesVar: string[] = [];
  sourceVar: string[] = [];
  formTypeVar: string[] = [];

  statesVar = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  submitted = false;
  view = false;
  egg = false;

  page: any = 1;
  pageTotal: any;

  dropdownSettings = {};

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    //set drop down settings
    /*this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'coverage',
      itemsShowLimit: 5,
      allowSearchFilter: false,
      enableCheckAll: true,
      selectAllText: 'Select All States',
      unSelectAllText: 'Deselect All States'
    };*/

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
      formId: [null, Validators.required]
    });

    // Get form id from active route and determine if this is a new form or an existing one
    this.route.paramMap.subscribe(parameterMap => {
      this.originalFormId = parameterMap.get('formId');
      if (this.originalFormId != "new") {
        // Existing form
        this.getForm(this.originalFormId);
      } else {
        // New form
        this.newForm = true;
      }
    });
  }

  // Retrieve the form the user wants to update and populate the page with its details
  private getForm(formId: string) {
    this.form = this.formService.getSingleForm(formId).pipe(
      tap(form => this.model.patchValue(form))
    )
    this.formService.getSingleForm(formId).subscribe(form => this.originalForm = form)
  }

  getForms() {
    this.formService.getForms().subscribe( forms => {
      this.forms = forms;
      if (this.initialGetForms) { // only retrieve dropdown options on initial getForms()
        this.updateDropdownOptions();
        this.initialGetForms = false;
      }
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
  }

  // POST or PUT submitted form depending on form id
  submit() {
    // If adding a new form, call a POST
    if (this.newForm) {
      const createdForm: Form = Object.assign({}, this.model.value);
      this.formService.addForm(createdForm).subscribe(
        (data: Form) => {
          console.log('Added form: ');
          console.log(data);
          this.router.navigate(['']);
        }
      );

      //If updating an existing form, call a PUT
    } else {
      const updatedForm: Form = Object.assign({}, this.model.value);
      this.formService.updateForm(this.originalFormId, updatedForm).subscribe(
        () => {
          console.log('Updated form w/ id' + this.model.value.formId);
          console.log(updatedForm);
          this.router.navigate(['']);
        }
      )
    }
  }

  //PDF Viewer functions to have pagination
  callBackFn(pdf: PDFDocumentProxy) {
    this.pageTotal = pdf.numPages;
  }

  nextPage() {
    if(this.page < this.pageTotal) {
      this.page = this.page + 1;
    }
  }

  prevPage() {
    if(this.page > 1) {
      this.page = this.page - 1;
    }
  }

  easterEgg(name: string) {
    if (name=='amanda.x.nelson') {
      this.egg=true;
    }
  }
  /*updateState(): void {
    let tempArray = [];
    this.model.value.state.forEach((item) => tempArray.push(item.valueOf()));
    this.coverageState.length = 0;
    this.coverageState = tempArray;
  }

  onSelectAll(): void {
    let tempArray = [];
    this.states.forEach((item) => tempArray.push(item.valueOf()));
    this.coverageState.length = 0;
    this.coverageState = tempArray;
  }

  onDeSelectAll(): void {
    let tempArray = [];
    this.coverageState.length = 0;
    this.coverageState = tempArray;
  }
  message: string = '';
  validate(input: string) {
    if (input.length == 0) {
      this.message = "Field is required."
    }

  }
   */

}





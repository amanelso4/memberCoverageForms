import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { FormService } from "../form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PDFSource, PdfViewerModule } from "ng2-pdf-viewer";
import { PDFDocumentProxy, PDFPromise, PDFProgressData, PDFJS } from "pdfjs-dist";
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css'],
})
export class SubmissionFormComponent implements OnInit {

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
  newForm = false;

  coverageTypes = ['STD', 'LTD', 'DENTAL', 'GAP', 'DENTALPREPAID', 'CRITICALILLNESS'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystems = ['S', 'Q'];

  formTypes = ['Claim', 'Continuance'];

  submitted = false;
  view = false;
  egg = false;

  dropdownSettings = {};
  coverageState = [];

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
    // Initialize form to blank values
    this.model = this.formBuilder.group({
      id: [null, Validators.required],
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
      const id = +parameterMap.get('id');
      if (id !== 0) {
        // Existing form
        this.getForm(id);
      } else {
        // New form
        this.newForm = true;
      }
    });
  }

  // Retrieve the form the user wants to update and populate the page with its details
  private getForm(id: number) {
    this.form = this.formService.getSingleForm(id).pipe(
      tap(form => this.model.patchValue(form))
    )
  }

  // POST or PUT submitted form depending on form id
  submit() {
    // If adding a new form, call a POST
    if (this.model.value.id === null) {
      const newForm: Form = Object.assign({}, this.model.value);
      this.formService.addForm(newForm).subscribe(
        (data: Form) => {
          console.log('Added form: ');
          console.log(data);
          this.router.navigate(['table']);
        }
      );
      //If updating an existing form, call a PUT
    } else {
      const updatedForm: Form = Object.assign({}, this.model.value);
      this.formService.updateForm(updatedForm).subscribe(
        () => {
          console.log('Updated form w/ id' + this.model.value.id);
          console.log(updatedForm);
          this.router.navigate(['table']);
        }
      )
    }
  }


  updateState(): void {
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
  easterEgg(name: string) {
    if (name=='amanda.x.nelson') {
      this.egg=true;
    }
  }



}





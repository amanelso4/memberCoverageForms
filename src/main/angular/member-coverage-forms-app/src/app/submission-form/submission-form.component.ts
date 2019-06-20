import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { FormService } from "../form.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgModel } from "@angular/forms";

import { PDFSource, PdfViewerModule } from "ng2-pdf-viewer";

import { PDFDocumentProxy, PDFPromise, PDFProgressData, PDFJS } from "pdfjs-dist";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css'],
})
export class SubmissionFormComponent implements OnInit {
  //multiselect dropdown module
  dropdownSettings = {};
  selectedItems = [];
  Form = new Form; //we should probably give this a different name for clarity's sake
  pdfSrc: string = "";
  page: any = 1;
  pageTotal: any;
  private _pdf: PDFDocumentProxy;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  //////////////////
  // DECLARATIONS //
  //////////////////

  forms: Form[];
  form: Observable<Form>;
  newModel: FormGroup;
  newForm = false;

  //coverageTypes = ['Short-term Disability', 'Long-term Disability', 'Dental', 'Vision', 'Life', 'AD&D', 'Critical Illness', 'Accident', 'Vision', 'Gap'];
  coverageTypes = ['STD', 'LTD', 'DENTAL'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystems = ['S', 'Q'];

  formTypes = ['Claim', 'Continuance'];

  submitted = false;
  view = false;

  link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf';

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    this.newModel = this.formBuilder.group({
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
    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      if (id !== 0) {
        this.getForm(id);
      } else {
        this.newForm = true;
      }
    });
  }

  private getForm(id: number) {
    this.form = this.formService.getSingleForm(id).pipe(
      tap(form => this.newModel.patchValue(form))
    )
  }

  submit() {
    // If adding a new form, call a POST
    if (this.newModel.value.id === null) {
      const newForm: Form = Object.assign({}, this.newModel.value);
      this.formService.addForm(newForm).subscribe(
        (data: Form) => {
          console.log('Added form: ');
          console.log(data);
          this.router.navigate(['table']);
        }
      );
      //If updating an existing form, call a PUT
    } else {
      const updatedForm: Form = Object.assign({}, this.newModel.value);
      this.formService.updateForm(updatedForm).subscribe(
        () => {
          console.log('Updated form w/ id' + this.newModel.value.id);
          console.log(updatedForm);
          this.router.navigate(['table']);
        }
      )
    }
  }
}





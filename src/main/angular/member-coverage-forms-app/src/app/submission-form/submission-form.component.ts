

import { Component } from '@angular/core';
import {Form} from '../form';



@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent {

  coverageTypes = ['Short-term Disability', 'Long-term Disability', 'Dental', 'Vision'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystems = ['SOLAR', 'QPS'];

  formTypes = ['Claim', 'Continuance', 'Other'];

  model = new Form(' ', ' ', ' ', ' ', 'Type name here...', 'Type link here...', 'Type Description here...');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  newForm() {
    this.model = new Form('', '', '', '', '', '', '');
  }

  vision(): Form {
    let myForm = new Form('a', 'b', 'c', 'd', 'e', 'f', 'g');
    console.log('My Form is called ' + myForm.name);
    return myForm;
  }


}



/*
import { Component, OnInit } from '@angular/core';
import { Form } from './form';
import { FormsService } from './forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './submission-form.component.html',
  providers: [ FormsService ],
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit {
  forms: Form[];
  editForm: Form;

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.getForms();
  }

  getForms(): void {
    this.formsService.getForms()
      .subscribe(forms => this.forms = forms);
  }

  add(name: string): void {
    this.editForm = undefined;
    name = name.trim();
    if (!name) { return; }


    add(name: string): void {
      name = name.trim();
    if (!name) { return; }
    this.formService.addForm({ name } as Form)
      .subscribe(form => {
        this.forms.push(form);
      });
  }



    const newForm: Form = { name } as Form;
    this.formsService.addForm(newForm)
      .subscribe(form => this.forms.push(form));
  }

  delete(form: Form): void {
    this.forms = this.forms.filter(h => h !== form);
    this.formsService.deleteForm(form.id).subscribe();

  }

  edit(form) {
    this.editForm = form;
  }

  search(searchTerm: string) {
    this.editForm = undefined;
    if (searchTerm) {
      this.formsService.searchForms(searchTerm)
        .subscribe(forms => this.forms = forms);
    }
  }

  update() {
    if (this.editForm) {
      this.formsService.updateForm(this.editForm)
        .subscribe(form => {

          const ix = form ? this.forms.findIndex(h => h.name ===form.name) : -1;
          if (ix > -1) { this.forms[ix] = form; }
        });
      this.editForm = undefined;
    }



  }*/


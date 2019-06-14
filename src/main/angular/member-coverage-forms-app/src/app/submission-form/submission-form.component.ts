import { Component, OnInit } from '@angular/core';

import { Form} from '../form';
import {PostService} from '../post.service';

@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit{
  forms: Form[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getForms();
  }

  getForms(): void {
    this.postService.getForms()
      .subscribe(forms => this.forms = forms);
  }

  add(name: string): void {
    name = name.trim();
    this.postService.addForm({ name } as Form)
      .subscribe(form => {
        this.forms.push(form);
      });
  }

  coverageTypes = ['Short-term Disability', 'Long-term Disability', 'Dental', 'Vision', 'Life', 'AD&D', 'Critical Illness', 'Accident', 'Vision', 'Gap'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystems = ['SOLAR', 'QPS'];

  formTypes = ['Claim', 'Continuance', 'Other'];

  model = new Form();

  submitted = false;


  onSubmit() {
    this.submitted = true;
  };

  link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf';


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


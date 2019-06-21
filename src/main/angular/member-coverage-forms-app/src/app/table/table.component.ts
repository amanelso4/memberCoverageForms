import { Component, OnInit } from '@angular/core';
import { Form, FormService } from "../form.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {
    //Using table-resolver service to get initial form data - allows for data to be pre-fetched
    // this.forms = this.activatedRoute.snapshot.data['formList'];
  }

  //////////////////
  // DECLARATIONS //
  //////////////////


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


  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    this.initialGetForms = true;
    this.getForms();
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

  //Delete a form by providing the form's id as an argument
  deleteForm(id: number) {
    this.formService.deleteForm(id).subscribe(() => {
      console.log('Employee w/ Id ' + id + ' deleted');
      this.getForms();
    });
  }

}

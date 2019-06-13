import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Form } from '../form';
import { MOCKFORMS } from "../../assets/mockForms";
import { FormInt } from "../../assets/formInt";
import { TableHelperService } from "../table-helper.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  forms: FormInt[];

  coverageTypesVar = ['STD', 'LTD', 'DENTAL'];

  statesVar = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystemsVar = ['SOLAR', 'QPS'];

  formTypeVar = ['Claim', 'Continuance'];

  formType: string = '';
  coverageType: string = '';
  states: string[] = [];
  name: string = '';
  description: string = '';
  link: string = '';

  constructor(
    private tableHelper: TableHelperService
  ) { }

  ngOnInit() {
    this.getForms();
  }

  //Retrieves forms using tableHelper's http request
  getForms() {
    this.tableHelper.getForms().subscribe( //Subscribing to observable
      (data: FormInt[]) => this.forms = data as FormInt[]);//Parameter is 'data', which is in the form of a form interface
      //wat is a local form interface which is filled with the data
  }

  //Clear the currently selected filters
  clearFilters() {
    this.formType = '';
    this.coverageType = '';
    this.states = [];
    this.name = '';
    this.description = '';
    this.link = '';
  }

}

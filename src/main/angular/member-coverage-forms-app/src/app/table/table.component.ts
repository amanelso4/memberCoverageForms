import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Form } from '../form';
import { MOCKFORMS } from "../../assets/mockForms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  forms: Form[];

  coverageTypesVar = ['STD', 'LTD', 'DENTAL'];

  statesVar = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystemsVar = ['SOLAR', 'QPS'];

  formTypeVar = ['Claim', 'Continuance'];

  tableFilters = new FormGroup({
    formType: new FormControl(''),
    coverageType: new FormControl(''),
    states: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    this.forms = MOCKFORMS;
  }

}

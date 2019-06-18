import { Component, OnInit } from '@angular/core';
import { FormInt } from "../../assets/formInt";
import { TableHelperService } from "../table-helper.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private tableHelper: TableHelperService
  ) { }

  //////////////////
  // DECLARATIONS //
  //////////////////

  forms: FormInt[];

  formsPerPage: number;
  currentIndex: number;
  p: number = 1;

  formType: string = '';
  coverageType: string = '';
  state: string = '';
  sourceSystem: string = '';
  formId: string = '';
  name: string = '';

  coverageTypesVar = ['STD', 'LTD', 'DENTAL', 'GAP', 'DENTALPREPAID', 'CRITICALILLNESS'];

  statesVar = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceVar = ['S', 'Q'];

  formTypeVar = ['Claim', 'Continuance'];

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit() {
    this.getForms();
    this.formsPerPage = 10;
    this.currentIndex = 1;
  }

  //Retrieves forms using tableHelper's http request
  getForms() {
    this.tableHelper.getForms().subscribe(
      (data: FormInt[]) => this.forms = data as FormInt[]); // Parameter is 'data', which is in the form of a form interface
  }

  //Clear the currently selected filters
  clearFilters() {
    this.formType = '';
    this.coverageType = '';
    this.state = '';
    this.name = '';
    this.sourceSystem = '';
    this.formId = '';
  }

  //Delete a form by providing the form's id as an argument
  deleteForm(formId: number) {
    this.tableHelper.delete(formId).subscribe(
      () => console.log('Employee w/ Id ' + formId + ' deleted')
    );
    this.getForms(); //Update form list so deletion affects table
  }

}

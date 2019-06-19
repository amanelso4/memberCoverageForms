import { Component, OnInit } from '@angular/core';
import { Form } from "../form";
import { TableHelperService } from "../table-helper.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private tableHelper: TableHelperService,
    private activatedRoute: ActivatedRoute
  ) {
    //Using table-resolver service to get initial form data - allows for data to be pre-fetched
    this.forms = this.activatedRoute.snapshot.data['formList'];
  }

  //////////////////
  // DECLARATIONS //
  //////////////////


  forms: Form[];

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
  }

  //Clear the currently selected filters
  clearFilters() {
    this.formType = '';
    this.coverageType = '';
    this.state = '';
    this.name = '';
    this.sourceSystem = '';
    this.formId = '';
    console.log(this.forms);
  }

  //Retrieve updated forms after a delete call
  getForms() {
    this.tableHelper.getForms().subscribe( forms => this.forms = forms);
  }

  //Delete a form by providing the form's id as an argument
  deleteForm(formId: number) {
    this.tableHelper.delete(formId).subscribe(() => {
      console.log('Employee w/ Id ' + formId + ' deleted');
      this.getForms();
    });
  }

}

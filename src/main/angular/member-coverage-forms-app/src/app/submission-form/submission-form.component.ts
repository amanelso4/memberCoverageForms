import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { FormService } from "../form.service";
import { ActivatedRoute } from "@angular/router";
import {NgModel} from "@angular/forms";
import {PDFSource, PdfViewerModule} from "ng2-pdf-viewer";


@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css'],
})
export class SubmissionFormComponent implements OnInit{

  dropdownSettings = {};
  selectedStates = [];
  coverageState = [];


  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ){}


  //////////////////
  // DECLARATIONS //
  //////////////////

  forms: Form[];

  //coverageTypes = ['Short-term Disability', 'Long-term Disability', 'Dental', 'Vision', 'Life', 'AD&D', 'Critical Illness', 'Accident', 'Vision', 'Gap'];
  coverageTypes = ['STD', 'LTD', 'DENTAL'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'];

  sourceSystems = ['S', 'Q'];

  formTypes = ['Claim', 'Continuance'];

  model = new Form();

  submitted = false;
  view = false;

  link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf';

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit(): void {
//set drop down settings
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'coverage',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll: true,
      selectAllText: 'Select All States',
      unSelectAllText: 'Deselect All States'
    };

  }

  add(model: Form): void {
    this.formService.addForm(model).subscribe();
    }


  updateState(): void {
    let tempArray = [];
    this.selectedStates.forEach((item) => tempArray.push(item.valueOf()));
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

}





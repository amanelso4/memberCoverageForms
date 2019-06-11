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

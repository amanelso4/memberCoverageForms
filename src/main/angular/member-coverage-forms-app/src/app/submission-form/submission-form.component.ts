import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { PostService } from '../post.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './submission-form.component.html',
  styleUrls: ['./submission-form.component.css']
})
export class SubmissionFormComponent implements OnInit{

  constructor(
    private postService: PostService,
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

  link: 'https://www.slfserviceresources.com/forms/claims/k0384any.pdf';

  //////////////////
  ///// METHODS ////
  //////////////////

  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('formId');
      this.getForm(id);
    });
  }

  private getForm(id: number) {
    if(id === 0) {
      this.model = {
        id: null,
        coverageType: null,
        state: null,
        sourceSystem: null,
        formType: null,
        name: null,
        link: null,
        description: null,
        formId: null
      };
    } else {
      //Need to call a function that fills model with proper values
    }
  }

  add(model: Form): void {
    this.postService.addForm(model)
      .subscribe(form => {
        this.forms.push(form);
      });
  }

}

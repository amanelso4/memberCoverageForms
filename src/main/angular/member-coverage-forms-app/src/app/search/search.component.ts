import { Component, OnInit } from '@angular/core';
import {Form} from "../form";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  coverageTypes = ['Short-term Disability', 'Long-term Disability', 'Dental', 'Vision'];

  states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
    'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
    'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT',
    'WA', 'WI', 'WV', 'WY', 'All States'];

  sourceSystems = ['SOLAR', 'QPS'];

  formTypes = ['Claim', 'Continuance', 'Other'];

  model = new Form(' ', ' ', ' ', ' ', 'Type name here...', 'Type link here...', 'Type Description here...');

  submitted = false;

  constructor(
  ) { }

  ngOnInit() {


    }
  }



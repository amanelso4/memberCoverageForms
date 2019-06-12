import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { MOCKFORMS } from "../../assets/mockForms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  forms: Form[];

  constructor() { }

  ngOnInit() {
    this.forms = MOCKFORMS;
  }

}

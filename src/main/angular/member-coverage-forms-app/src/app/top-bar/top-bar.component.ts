import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private router: Router // Included so that button can be disappeared on add form page
  ) { }

  //FontAwesome Icons for use on button
  faPlus = faPlus;
  faPlusCircle = faPlusCircle;

  ngOnInit() {
  }

}

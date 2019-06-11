import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent
  ],
  imports: [
    RouterModule.forRoot([{path: '', component: SubmissionFormComponent},
      ]),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

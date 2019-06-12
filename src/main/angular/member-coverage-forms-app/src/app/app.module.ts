import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfigComponent } from './config/config.component';

const appRoutes: Routes = [
  {path: 'submission-form', component: SubmissionFormComponent},
  {path: 'confirmation-form', component: ConfirmationComponent},
  {path: '', redirectTo: '/submission-form', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent,
    ConfirmationComponent,
    ConfigComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

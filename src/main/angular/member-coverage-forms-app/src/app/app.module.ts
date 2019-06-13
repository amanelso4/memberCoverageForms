import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfigComponent } from './config/config.component';
import { TableComponent } from './table/table.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

const appRoutes: Routes = [
  {path: 'submission-form', component: SubmissionFormComponent},
  {path: 'table', component: TableComponent},
  {path: '', redirectTo: '/submission-form', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent,

    ConfirmationComponent,
    ConfigComponent,
    TableComponent,
    TopBarComponent,

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

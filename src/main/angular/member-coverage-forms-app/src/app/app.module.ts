// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { TableComponent } from './table/table.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FilterPipe } from "./pipes/filter.pipe";
import { LoginService } from "./login.service";

// Other modules
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MatOptionModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'mfm/:formNumber', component: SubmissionFormComponent},
  {path: 'mfm', component: TableComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent,
    TableComponent,
    TopBarComponent,
    FilterPipe,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    NgxLoadingModule.forRoot({primaryColour: '#ffcb05', secondaryColour: '#ffcb05', tertiaryColour: '#ffcb05'}),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }


/*platformBrowserDynamic().bootstrapModule(AppModule);*/

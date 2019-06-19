import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { TableComponent } from './table/table.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { InMemoryDataService } from "./in-memory-data.service";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { FilterPipe } from "./pipes/filter.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TableResolverService } from "./table-resolver.service";

const appRoutes: Routes = [
  {path: 'submission-form/:formId', component: SubmissionFormComponent},
  {path: 'table', component: TableComponent, resolve: { formList: TableResolverService }},
  {path: '', redirectTo: 'table', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent,
    TableComponent,
    TopBarComponent,
    FilterPipe,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
  //  PdfViewerModule,
  ],
  providers: [TableResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);


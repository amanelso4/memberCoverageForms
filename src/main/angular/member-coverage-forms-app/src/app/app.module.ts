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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TableResolverService } from "./table-resolver.service";
import { NgMultiSelectDropDownModule } from '../../node_modules/ng-multiselect-dropdown';

const appRoutes: Routes = [
  {path: 'mfm/:id', component: SubmissionFormComponent},
  {path: 'mfm', component: TableComponent, resolve: { formList: TableResolverService }},
  {path: '', redirectTo: 'mfm', pathMatch: 'full'},
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
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    PdfViewerModule,
    NgMultiSelectDropDownModule,
  ],
  providers: [TableResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }



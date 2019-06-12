import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const appRoutes: Routes = [
  {path: 'submission-form', component: SubmissionFormComponent},
  {path: 'search-form', component: SearchComponent},
  {path: '', redirectTo: '/submission-form', pathMatch: 'full'},
  {path: 'table', component: TableComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SubmissionFormComponent,
    SearchComponent,
    TableComponent,
    TopBarComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

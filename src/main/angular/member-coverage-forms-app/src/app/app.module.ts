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

// Other modules
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MatOptionModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgxLoadingModule } from "ngx-loading";
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: 'mfm/:formId', component: SubmissionFormComponent},
  {path: 'mfm', component: TableComponent},
  {path: 'login', component: LoginComponent},
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
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


/*platformBrowserDynamic().bootstrapModule(AppModule);*/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CalculatePageRoutingModule} from './calculate-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {CalculatePage} from './calculate.page';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatSliderModule} from "@angular/material/slider";
import {DialogFormComponent} from "./dialog-form/dialog-form.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE , MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {NgxPaginationModule} from "ngx-pagination";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatListModule} from "@angular/material/list";


@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    CalculatePageRoutingModule ,
    MatIconModule ,
    MatButtonModule ,
    MatProgressSpinnerModule ,
    MatCardModule ,
    MatRadioModule ,
    MatSliderModule,
    MatInputModule ,
    NgxPaginationModule ,
    MatExpansionModule ,
    MatMenuModule ,
    MatDialogModule ,
    MatDatepickerModule ,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatListModule,
    MatNativeDateModule,
  ] ,
  exports:[
    MatDatepickerModule,
    MatButtonModule
  ],
  providers: [
    MatFormFieldModule,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  declarations: [CalculatePage, DialogFormComponent]
})
export class CalculatePageModule {
}

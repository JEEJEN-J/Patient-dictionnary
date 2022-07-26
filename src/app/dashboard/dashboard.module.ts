import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from '@angular/material/dialog';
import {DialogCalculateComponent} from "./dialog-calculate/dialog-calculate.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE , MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatListModule} from "@angular/material/list";


@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    DashboardPageRoutingModule ,
    MatIconModule ,
    MatInputModule ,
    MatButtonModule ,
    MatCardModule ,
    NgxPaginationModule ,
    MatExpansionModule ,
    MatMenuModule ,
    MatDialogModule ,
    MatDatepickerModule ,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatListModule,
    MatNativeDateModule,
  ],
  exports:[
    MatDatepickerModule,
    MatButtonModule
  ],
  providers: [
    MatFormFieldModule,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  declarations: [DashboardPage, DialogCalculateComponent]
})
export class DashboardPageModule {}

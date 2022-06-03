import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgxPaginationModule} from 'ngx-pagination';
import {MatExpansionModule} from "@angular/material/expansion";


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
    MatExpansionModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

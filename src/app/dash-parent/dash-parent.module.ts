import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DashParentPageRoutingModule} from './dash-parent-routing.module';

import {DashParentPage} from './dash-parent.page';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    DashParentPageRoutingModule ,
    MatIconModule ,
    MatButtonModule ,
  ] ,
  declarations: [DashParentPage]
})
export class DashParentPageModule {
}

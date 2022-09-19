import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';


import { LaguesPageRoutingModule } from './lagues-routing.module';

import { LaguesPage } from './lagues.page';
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    LaguesPageRoutingModule ,
    MatListModule ,
    MatRadioModule ,
    MatButtonModule ,
    IonicModule ,
    ReactiveFormsModule ,
  ],
  declarations: [LaguesPage]
})
export class LaguesPageModule {}

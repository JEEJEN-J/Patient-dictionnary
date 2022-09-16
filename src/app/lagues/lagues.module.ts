import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaguesPageRoutingModule } from './lagues-routing.module';

import { LaguesPage } from './lagues.page';
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule ,
        FormsModule ,
        IonicModule ,
        LaguesPageRoutingModule ,
        MatListModule ,
        MatRadioModule ,
        MatButtonModule
    ],
  declarations: [LaguesPage]
})
export class LaguesPageModule {}

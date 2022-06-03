import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefinitionPageRoutingModule } from './definition-routing.module';

import { DefinitionPage } from './definition.page';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgxPaginationModule} from "ngx-pagination";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    DefinitionPageRoutingModule ,
    MatIconModule ,
    MatInputModule ,
    MatButtonModule ,
    MatCardModule ,
    NgxPaginationModule ,
    MatMenuModule ,
  ],
  declarations: [DefinitionPage]
})
export class DefinitionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {IonicModule} from "@ionic/angular";



@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    HomePageRoutingModule ,
    MatInputModule ,
    MatIconModule ,
    MatButtonModule ,
    MatCardModule ,
    IonicModule ,

  ],
  declarations: [HomePage]
})
export class HomePageModule {}

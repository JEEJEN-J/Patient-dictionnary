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
import {ProfilPageModule} from "../profil/profil.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";



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
        ProfilPageModule ,
        TranslateModule ,
        MatSidenavModule ,
        MatDividerModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}

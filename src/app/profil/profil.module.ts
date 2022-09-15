import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    ProfilPageRoutingModule ,
    MatSidenavModule ,
    MatFormFieldModule ,
    MatSelectModule ,
    MatButtonModule
  ] ,
    exports: [
        ProfilPage
    ] ,
    declarations: [ProfilPage]
})
export class ProfilPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    ProfilPageRoutingModule ,
    MatSidenavModule ,
    MatFormFieldModule ,
    MatSelectModule ,
    MatButtonModule ,
    ReactiveFormsModule ,
    MatRadioModule ,
    MatInputModule ,
    MatIconModule
  ] ,
    exports: [
        ProfilPage
    ] ,
    declarations: [ProfilPage]
})
export class ProfilPageModule {}

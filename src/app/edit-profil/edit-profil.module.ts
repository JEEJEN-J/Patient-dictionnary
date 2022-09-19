import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilPageRoutingModule } from './edit-profil-routing.module';

import { EditProfilPage } from './edit-profil.page';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule ,
    FormsModule ,
    IonicModule ,
    EditProfilPageRoutingModule ,
    MatFormFieldModule ,
    ReactiveFormsModule ,
    MatInputModule ,
    MatButtonModule
  ],
  declarations: [EditProfilPage]
})
export class EditProfilPageModule {}

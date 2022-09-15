import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaguesPageRoutingModule } from './lagues-routing.module';

import { LaguesPage } from './lagues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaguesPageRoutingModule
  ],
  declarations: [LaguesPage]
})
export class LaguesPageModule {}

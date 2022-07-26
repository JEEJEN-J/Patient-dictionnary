import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargeViralePage } from './charge-virale.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeViralePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeViralePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaguesPage } from './lagues.page';

const routes: Routes = [
  {
    path: '',
    component: LaguesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaguesPageRoutingModule {}

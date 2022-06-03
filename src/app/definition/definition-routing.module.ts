import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinitionPage } from './definition.page';

const routes: Routes = [
  {
    path: '',
    component: DefinitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinitionPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefinitionParentPage } from './definition-parent.page';

const routes: Routes = [
  {
    path: '',
    component: DefinitionParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinitionParentPageRoutingModule {}

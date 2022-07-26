import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'definition',
    loadChildren: () => import('./definition/definition.module').then( m => m.DefinitionPageModule)
  },
  {
    path: 'dash-parent',
    loadChildren: () => import('./dash-parent/dash-parent.module').then( m => m.DashParentPageModule)
  },
  {
    path: 'definition-parent',
    loadChildren: () => import('./definition-parent/definition-parent.module').then( m => m.DefinitionParentPageModule)
  },
  {
    path: 'ordonnance',
    loadChildren: () => import('./ordonnance/ordonnance.module').then( m => m.OrdonnancePageModule)
  },
  {
    path: 'calculate',
    loadChildren: () => import('./calculate/calculate.module').then( m => m.CalculatePageModule)
  },
  {
    path: 'charge-virale',
    loadChildren: () => import('./charge-virale/charge-virale.module').then( m => m.ChargeViralePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

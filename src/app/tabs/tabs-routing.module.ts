import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren:  () => import('../tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren:  () => import('../tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab1/productlist',
        loadChildren:  () => import('../productlist/productlist.module').then( m => m.ProductlistPageModule)
      },
      {
        path: 'tab3',
        loadChildren:  () => import('../tabs3/tabs3.module').then( m => m.Tabs3PageModule)
      },
      {
        path: 'tab4',
        loadChildren:  () => import('../tabs4/tabs4.module').then( m => m.Tabs4PageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'tab1', loadChildren: () => import('../home/home.module').then( m => m.HomePageModule) },
        { path: 'tab2', loadChildren: () => import('../tab2/tab2.module').then( m => m.Tab2PageModule) },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/tab1',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

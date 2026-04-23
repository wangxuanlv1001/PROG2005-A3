import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('../pages/list/list.module').then((m) => m.ListPageModule)
      },
      {
        path: 'add',
        loadChildren: () =>
          import('../pages/add/add.module').then((m) => m.AddPageModule)
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../pages/edit/edit.module').then((m) => m.EditPageModule)
      },
      {
        path: 'privacy',
        loadChildren: () =>
          import('../pages/privacy/privacy.module').then((m) => m.PrivacyPageModule)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
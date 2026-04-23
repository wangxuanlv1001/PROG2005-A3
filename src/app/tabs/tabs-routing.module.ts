import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list-search',
        loadChildren: () =>
          import('../pages/list-search/list-search.module').then(
            (m) => m.ListSearchPageModule
          ),
      },
      {
        path: 'add-featured',
        loadChildren: () =>
          import('../pages/add-featured/add-featured.module').then(
            (m) => m.AddFeaturedPageModule
          ),
      },
      {
        path: 'update-delete',
        loadChildren: () =>
          import('../pages/update-delete/update-delete.module').then(
            (m) => m.UpdateDeletePageModule
          ),
      },
      {
        path: 'privacy-security',
        loadChildren: () =>
          import('../pages/privacy-security/privacy-security.module').then(
            (m) => m.PrivacySecurityPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/list-search',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/list-search',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
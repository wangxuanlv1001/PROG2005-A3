import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'list-search',
    loadChildren: () => import('./pages/list-search/list-search.module').then( m => m.ListSearchPageModule)
  },
  {
    path: 'add-featured',
    loadChildren: () => import('./pages/add-featured/add-featured.module').then( m => m.AddFeaturedPageModule)
  },
  {
    path: 'update-delete',
    loadChildren: () => import('./pages/update-delete/update-delete.module').then( m => m.UpdateDeletePageModule)
  },
  {
    path: 'privacy-security',
    loadChildren: () => import('./pages/privacy-security/privacy-security.module').then( m => m.PrivacySecurityPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSearchPage } from './list-search.page';

const routes: Routes = [
  {
    path: '',
    component: ListSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSearchPageRoutingModule {}

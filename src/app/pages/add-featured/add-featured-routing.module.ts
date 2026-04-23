import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFeaturedPage } from './add-featured.page';

const routes: Routes = [
  {
    path: '',
    component: AddFeaturedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFeaturedPageRoutingModule {}

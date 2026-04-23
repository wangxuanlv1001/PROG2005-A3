import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDeletePage } from './update-delete.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDeletePageRoutingModule {}

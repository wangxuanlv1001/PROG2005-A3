import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDeletePageRoutingModule } from './update-delete-routing.module';

import { UpdateDeletePage } from './update-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDeletePageRoutingModule
  ],
  declarations: [UpdateDeletePage]
})
export class UpdateDeletePageModule {}

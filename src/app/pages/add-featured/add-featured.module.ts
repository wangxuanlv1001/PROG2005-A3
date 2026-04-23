import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFeaturedPageRoutingModule } from './add-featured-routing.module';

import { AddFeaturedPage } from './add-featured.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFeaturedPageRoutingModule
  ],
  declarations: [AddFeaturedPage]
})
export class AddFeaturedPageModule {}

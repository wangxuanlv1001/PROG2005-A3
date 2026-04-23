import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSearchPageRoutingModule } from './list-search-routing.module';

import { ListSearchPage } from './list-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSearchPageRoutingModule
  ],
  declarations: [ListSearchPage]
})
export class ListSearchPageModule {}

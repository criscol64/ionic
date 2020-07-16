import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DishdetailPageRoutingModule } from './dishdetail-routing.module';

import { DishdetailPage } from './dishdetail.page';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishdetailPageRoutingModule
  ],
  declarations: [DishdetailPage]
})
export class DishdetailPageModule {}

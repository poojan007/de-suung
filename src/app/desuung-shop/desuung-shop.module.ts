import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesuungShopPageRoutingModule } from './desuung-shop-routing.module';

import { DesuungShopPage } from './desuung-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesuungShopPageRoutingModule
  ],
  declarations: [DesuungShopPage]
})
export class DesuungShopPageModule {}

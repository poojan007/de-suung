import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesuupNearbyPageRoutingModule } from './desuup-nearby-routing.module';

import { DesuupNearbyPage } from './desuup-nearby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesuupNearbyPageRoutingModule
  ],
  declarations: [DesuupNearbyPage]
})
export class DesuupNearbyPageModule {}

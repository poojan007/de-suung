import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanMovementPassPageRoutingModule } from './scan-movement-pass-routing.module';

import { ScanMovementPassPage } from './scan-movement-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanMovementPassPageRoutingModule
  ],
  declarations: [ScanMovementPassPage]
})
export class ScanMovementPassPageModule {}

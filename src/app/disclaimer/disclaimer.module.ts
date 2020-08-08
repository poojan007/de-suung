import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisclaimerPageRoutingModule } from './disclaimer-routing.module';

import { DisclaimerPage } from './disclaimer.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisclaimerPageRoutingModule
  ],
  declarations: [DisclaimerPage]
})
export class DisclaimerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentPageRoutingModule } from './entertainment-routing.module';

import { EntertainmentPage } from './entertainment.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentPageRoutingModule
  ],
  declarations: [EntertainmentPage]
})
export class EntertainmentPageModule {}

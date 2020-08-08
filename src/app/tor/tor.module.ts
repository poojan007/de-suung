import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TorPageRoutingModule } from './tor-routing.module';

import { TorPage } from './tor.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TorPageRoutingModule
  ],
  declarations: [TorPage]
})
export class TorPageModule {}

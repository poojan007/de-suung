import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentAlertPageRoutingModule } from './incident-alert-routing.module';

import { IncidentAlertPage } from './incident-alert.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentAlertPageRoutingModule
  ],
  declarations: [IncidentAlertPage]
})
export class IncidentAlertPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredeventsPageRoutingModule } from './registeredevents-routing.module';

import { RegisteredeventsPage } from './registeredevents.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisteredeventsPageRoutingModule
  ],
  declarations: [RegisteredeventsPage]
})
export class RegisteredeventsPageModule {}

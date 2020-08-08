import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoordinatorEventsPageRoutingModule } from './coordinator-events-routing.module';

import { CoordinatorEventsPage } from './coordinator-events.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoordinatorEventsPageRoutingModule
  ],
  declarations: [CoordinatorEventsPage]
})
export class CoordinatorEventsPageModule {}

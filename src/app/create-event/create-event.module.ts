import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateEventPageRoutingModule } from './create-event-routing.module';
import { CreateEventPage } from './create-event.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}

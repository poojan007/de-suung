import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributionsPageRoutingModule } from './contributions-routing.module';

import { ContributionsPage } from './contributions.page';
import { CommonpopoverComponent } from '../component/commonpopover/commonpopover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributionsPageRoutingModule
  ],
  declarations: [ContributionsPage]
})
export class ContributionsPageModule {}

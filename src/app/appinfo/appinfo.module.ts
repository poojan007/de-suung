import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppinfoPageRoutingModule } from './appinfo-routing.module';

import { AppinfoPage } from './appinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppinfoPageRoutingModule
  ],
  declarations: [AppinfoPage]
})
export class AppinfoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileQrcodePageRoutingModule } from './profile-qrcode-routing.module';

import { ProfileQrcodePage } from './profile-qrcode.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileQrcodePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [ProfileQrcodePage]
})
export class ProfileQrcodePageModule {}

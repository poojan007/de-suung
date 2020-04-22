import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerateQrPageRoutingModule } from './generate-qr-routing.module';
import { GenerateQrPage } from './generate-qr.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateQrPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GenerateQrPage]
})
export class GenerateQrPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileQrcodePage } from './profile-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileQrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileQrcodePageRoutingModule {}

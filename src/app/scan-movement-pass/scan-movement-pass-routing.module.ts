import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanMovementPassPage } from './scan-movement-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ScanMovementPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanMovementPassPageRoutingModule {}

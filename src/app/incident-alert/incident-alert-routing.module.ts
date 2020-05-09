import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentAlertPage } from './incident-alert.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentAlertPageRoutingModule {}

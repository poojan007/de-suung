import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredeventsPage } from './registeredevents.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredeventsPageRoutingModule {}

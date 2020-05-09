import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainmentPage } from './entertainment.page';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentPageRoutingModule {}

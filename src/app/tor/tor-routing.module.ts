import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorPage } from './tor.page';

const routes: Routes = [
  {
    path: '',
    component: TorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorPageRoutingModule {}

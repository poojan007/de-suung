import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesuupNearbyPage } from './desuup-nearby.page';

const routes: Routes = [
  {
    path: '',
    component: DesuupNearbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesuupNearbyPageRoutingModule {}

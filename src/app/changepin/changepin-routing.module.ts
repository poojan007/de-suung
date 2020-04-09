import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepinPage } from './changepin.page';

const routes: Routes = [
  {
    path: '',
    component: ChangepinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangepinPageRoutingModule {}

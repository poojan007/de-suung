import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppinfoPage } from './appinfo.page';

const routes: Routes = [
  {
    path: '',
    component: AppinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppinfoPageRoutingModule {}

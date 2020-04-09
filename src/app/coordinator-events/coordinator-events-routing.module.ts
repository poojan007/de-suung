import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinatorEventsPage } from './coordinator-events.page';

const routes: Routes = [
  {
    path: '',
    component: CoordinatorEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinatorEventsPageRoutingModule {}

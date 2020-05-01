import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesuungShopPage } from './desuung-shop.page';

const routes: Routes = [
  {
    path: '',
    component: DesuungShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesuungShopPageRoutingModule {}

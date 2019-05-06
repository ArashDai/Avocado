import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
//First, import the component at the top of the file with the other JavaScript import statements.
// Then, add the route to MenuComponent. 

//next: create a menuItemEditComponent and add its route here
const routes: Routes = [
  {
    path: '',
    component: MenuManagerComponent
  },
  {
    path: 'new',
    component: ItemCreateComponent
  },
  {
    path: 'details/:id',
    component: ItemDetailsComponent
  },
  {
    path: 'edit/:id',
    component: ItemCreateComponent,
    data: { update: true }
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MenuRoutingModule { }

export const MenuRoutingModule = RouterModule.forChild(routes);

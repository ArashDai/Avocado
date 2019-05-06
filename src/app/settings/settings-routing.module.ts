import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsMainComponent } from './settings-main/settings-main.component';
import { SettingsItemComponent } from './settings-item/settings-item.component';

import { CategoryManagerComponent } from './settings-item/settings-category/category-manager/category-manager.component';
import { CategoryCreateComponent } from './settings-item/settings-category/category-create/category-create.component';
import { CategoryDetailsComponent }  from './settings-item/settings-category/category-details/category-details.component';

import { OptionManagerComponent } from './settings-item/settings-option/option-manager/option-manager.component';
import { OptionCreateComponent } from './settings-item/settings-option/option-create/option-create.component';
import { OptionDetailsComponent } from './settings-item/settings-option/option-details/option-details.component';

import { TaxManagerComponent } from './settings-item/settings-tax/tax-manager/tax-manager.component';
import { TaxCreateComponent } from './settings-item/settings-tax/tax-create/tax-create.component';
import { TaxDetailsComponent } from './settings-item/settings-tax/tax-details/tax-details.component';

import { ComponentManagerComponent } from './settings-item/settings-component/component-manager/component-manager.component';
import { ComponentCreateComponent } from './settings-item/settings-component/component-create/component-create.component';
import { ComponentDetailsComponent } from './settings-item/settings-component/component-details/component-details.component';

import { ModifierManagerComponent } from './settings-item/settings-modifier/modifier-manager/modifier-manager.component';
import { ModifierCreateComponent } from './settings-item/settings-modifier/modifier-create/modifier-create.component';
import { ModifierDetailsComponent } from './settings-item/settings-modifier/modifier-details/modifier-details.component';

import { TypeManagerComponent } from './settings-item/settings-type/type-manager/type-manager.component';
import { TypeCreateComponent } from './settings-item/settings-type/type-create/type-create.component';
import { TypeDetailsComponent } from './settings-item/settings-type/type-details/type-details.component';

import { SubtypeManagerComponent } from './settings-item/settings-subtype/subtype-manager/subtype-manager.component';
import { SubtypeCreateComponent } from './settings-item/settings-subtype/subtype-create/subtype-create.component';
import { SubtypeDetailsComponent } from './settings-item/settings-subtype/subtype-details/subtype-details.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsMainComponent
  },
  {
    path: 'item',
    component: SettingsItemComponent
  },
  {
    path:'item/categories',
    component: CategoryManagerComponent
  },
  {
    path:'item/categories/create',
    component: CategoryCreateComponent
  },
  {
    path:'item/categories/edit/:id',
    component: CategoryCreateComponent,
    data: { update: true }
  },
  {
    path:'item/categories/details/:id',
    component: CategoryDetailsComponent
  },
  {
    path:'item/options',
    component: OptionManagerComponent
  },
  {
    path:'item/options/create',
    component: OptionCreateComponent
  },
  {
    path:'item/options/edit/:id',
    component: OptionCreateComponent,
    data: { update: true }
  },
  {
    path:'item/options/details/:id',
    component: OptionDetailsComponent
  },
  {
    path:'item/taxes',
    component: TaxManagerComponent
  },
  {
    path:'item/taxes/create',
    component: TaxCreateComponent
  },
  {
    path:'item/taxes/edit/:id',
    component: TaxCreateComponent,
    data: { update: true }
  },
  {
    path:'item/taxes/details/:id',
    component: TaxDetailsComponent
  },
  {
    path:'item/components',
    component: ComponentManagerComponent
  },
  {
    path:'item/components/create',
    component: ComponentCreateComponent
  },
  {
    path:'item/components/edit/:id',
    component: ComponentCreateComponent,
    data: { update: true }
  },
  {
    path:'item/components/details/:id',
    component: ComponentDetailsComponent
  },
  {
    path:'item/modifiers',
    component: ModifierManagerComponent
  },
  {
    path:'item/modifiers/create',
    component: ModifierCreateComponent
  },
  {
    path:'item/modifiers/edit/:id',
    component: ModifierCreateComponent,
    data: { update: true }
  },
  {
    path:'item/modifiers/details/:id',
    component: ModifierDetailsComponent
  },
  {
    path:'item/types',
    component: TypeManagerComponent
  },
  {
    path:'item/types/create',
    component: TypeCreateComponent
  },
  {
    path:'item/types/edit/:id',
    component: TypeCreateComponent,
    data: { update: true }
  },
  {
    path:'item/types/details/:id',
    component: TypeDetailsComponent
  },
  {
    path:'item/subtypes',
    component: SubtypeManagerComponent
  },
  {
    path:'item/subtypes/create',
    component: SubtypeCreateComponent
  },
  {
    path:'item/subtypes/edit/:id',
    component: SubtypeCreateComponent,
    data: { update: true }
  },
  {
    path:'item/subtypes/details/:id',
    component: SubtypeDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

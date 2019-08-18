import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { SettingsItemComponent } from './settings-item/settings-item.component';

import { CategoryManagerComponent } from './settings-item/settings-category/category-manager/category-manager.component';
import { CategoryCreateComponent } from './settings-item/settings-category/category-create/category-create.component';
import { CategoryDetailsComponent } from './settings-item/settings-category/category-details/category-details.component';

import { OptionManagerComponent } from './settings-item/settings-option/option-manager/option-manager.component';
import { OptionCreateComponent } from './settings-item/settings-option/option-create/option-create.component';
import { OptionDetailsComponent } from './settings-item/settings-option/option-details/option-details.component';

import { TaxManagerComponent } from './settings-item/settings-tax/tax-manager/tax-manager.component';
import { TaxCreateComponent } from './settings-item/settings-tax/tax-create/tax-create.component';
import { TaxDetailsComponent } from './settings-item/settings-tax/tax-details/tax-details.component';

import { ComponentCreateComponent } from './settings-item/settings-component/component-create/component-create.component';
import { ComponentManagerComponent } from './settings-item/settings-component/component-manager/component-manager.component';
import { ComponentDetailsComponent } from './settings-item/settings-component/component-details/component-details.component';

import { ModifierManagerComponent } from './settings-item/settings-modifier/modifier-manager/modifier-manager.component';
import { ModifierDetailsComponent } from './settings-item/settings-modifier/modifier-details/modifier-details.component';
import { ModifierCreateComponent } from './settings-item/settings-modifier/modifier-create/modifier-create.component';

import { TypeCreateComponent } from './settings-item/settings-type/type-create/type-create.component';
import { TypeDetailsComponent } from './settings-item/settings-type/type-details/type-details.component';
import { TypeManagerComponent } from './settings-item/settings-type/type-manager/type-manager.component';

import { SubtypeCreateComponent } from './settings-item/settings-subtype/subtype-create/subtype-create.component';
import { SubtypeDetailsComponent } from './settings-item/settings-subtype/subtype-details/subtype-details.component';
import { SubtypeManagerComponent } from './settings-item/settings-subtype/subtype-manager/subtype-manager.component';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule 
} from "@angular/material";


@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  declarations: [ 
    SettingsMainComponent,
    SettingsItemComponent,
    CategoryManagerComponent,
    CategoryCreateComponent,
    CategoryDetailsComponent,
    OptionManagerComponent,
    OptionCreateComponent,
    OptionDetailsComponent,
    TaxManagerComponent,
    TaxCreateComponent,
    TaxDetailsComponent,
    ComponentCreateComponent,
    ComponentManagerComponent,
    ComponentDetailsComponent,
    ModifierManagerComponent,
    ModifierDetailsComponent,
    ModifierCreateComponent,
    TypeCreateComponent,
    TypeDetailsComponent,
    TypeManagerComponent,
    SubtypeCreateComponent,
    SubtypeDetailsComponent,
    SubtypeManagerComponent,
  ],
  providers:[CurrencyPipe]
})
export class SettingsModule { }
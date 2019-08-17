import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { DialogComponent } from '../shared/dialog/dialog.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ReactiveFormsModule } from '@angular/forms';


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
  MatFormFieldModule } from "@angular/material";
import { ItemDetailsComponent } from './item-details/item-details.component';


@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
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
    MatFormFieldModule,
  ],
  declarations: [MenuManagerComponent, ItemCreateComponent, ItemDetailsComponent],
  providers: [CurrencyPipe]
})
export class MenuModule { }

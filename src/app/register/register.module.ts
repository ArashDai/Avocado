import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterMainComponent } from './register-main/register-main.component';
import { MenuItemSelectorComponent } from './register-main/menu-item-selector/menu-item-selector.component';
import { RegisterTicketComponent } from './register-main/register-ticket/register-ticket.component';
import { DialogQuestionService } from '../shared/dialog/dialog-question.service';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';

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
  MatFormFieldModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
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
    MatFormFieldModule
  ],
  declarations: [
    RegisterMainComponent,
    MenuItemSelectorComponent,
    RegisterTicketComponent,
    TransactionTableComponent
  ],
  providers: [
    CurrencyPipe,
    DialogQuestionService
  ]
})
export class RegisterModule { }

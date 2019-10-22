import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterMainComponent } from './register-main/register-main.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';

const routes: Routes = [
  {
    path: 'terminal',
    component: RegisterMainComponent
  },
  {
    path: 'transactions',
    component: TransactionTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterMainComponent } from './register-main/register-main.component';
import { MenuItemSelectorComponent } from './register-main/menu-item-selector/menu-item-selector.component';
import { RegisterTicketComponent } from './register-main/register-ticket/register-ticket.component';
import { DialogQuestionService } from '../shared/dialog/dialog-question.service';



@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterMainComponent,
    MenuItemSelectorComponent,
    RegisterTicketComponent
  ],
  providers: [
    CurrencyPipe,
    DialogQuestionService
  ]
})
export class RegisterModule { }

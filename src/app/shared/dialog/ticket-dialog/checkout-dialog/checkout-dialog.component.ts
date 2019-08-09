import { ApplicationRef, Component, ComponentFactoryResolver, OnInit, Injector, AfterViewInit } from '@angular/core';
import { DomPortalHost, Portal, ComponentPortal } from '@angular/cdk/portal';

import { TicketService } from '../../../ticket.service';
import { CashCheckoutComponent } from './cash-checkout/cash-checkout.component';
import { CreditCheckoutComponent } from './credit-checkout/credit-checkout.component';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})

  // todo
  // use portals to handle checkout with a portal component for cash, giftcard, and credit/debit

export class CheckoutDialogComponent implements OnInit, AfterViewInit {

  cashPortal: ComponentPortal<CashCheckoutComponent>;
  creditPortal: ComponentPortal<CreditCheckoutComponent>;
  selectedPortal: Portal<any>;
  
  checkoutTicket: any;
  ticketNumber: number;



  constructor( private ticketService: TicketService ) { }

  ngOnInit() {

      this.ticketNumber = this['ticket']+1;
      this.checkoutTicket = this.ticketService.getTicket(this['ticket']);

      
      console.log('the ticket: ', this.checkoutTicket)
  }

  ngAfterViewInit(){
    this.cashPortal = new ComponentPortal(CashCheckoutComponent);
    this.creditPortal = new ComponentPortal(CreditCheckoutComponent);
  }

}

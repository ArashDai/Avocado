import { ApplicationRef, Component, ComponentFactoryResolver, OnInit, Injector, ViewChild } from '@angular/core';
// import { DomPortalHost, Portal, ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { mergeMap } from 'rxjs/operators'
import { TicketService } from '../../../ticket.service';
import { ApiService } from 'src/app/api.service';
import { TransactionService } from 'src/app/shared/transaction.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})

export class CheckoutDialogComponent implements OnInit {
  @ViewChild('payment', { static: false }) paymentTemplate;

  paymentMethod: string;
  dialogRef: any;
  checkoutTicket: any;
  ticketNumber: number;

  constructor(
    private ticketService: TicketService,
    private transactionService: TransactionService,
    private api: ApiService
  ) { }

  ngOnInit() {
    // this['ticket'] is the id of the active ticket
    this.dialogRef = this['dialogRef'];
    this.ticketNumber = this['ticket'] + 1;
    this.setupCheckout();
  }

  setupCheckout() {
    this.ticketService.getTickets().subscribe(
      data => {

        this.checkoutTicket = {
          ticketItems: data.tickets[data.activeTicket],
          totals: data.totals[data.activeTicket],
          transaction: data.transactions[data.activeTicket]
        }

        const transactionData = {
          cashier: ['Bob'], // comes from ticket? or another user service yet to be made
          status: 'open',    // initial status is open
          step: 'selection',
          ticketItems: this.checkoutTicket.ticketItems,
          totals: this.checkoutTicket.totals,
          balanceDue: this.checkoutTicket.ticketItems.reduce((acc, c) => acc + c.balanceDue, 0),
          changeDue: 0
        }

        if (!this.checkoutTicket.transaction) {
          console.log('create transaction');
          // Ticket doesn't have a transaction:
          // create a transaction and add its _id to the ticket object
          transactionData.step = 'selection';
          this.checkoutTicket.transaction = this.transactionService.createTransaction(transactionData).key;
          this.ticketService.assignTransaction(this.checkoutTicket.transaction);

        } else {
          // Ticket has a transaction:
          // update the transaction with the ticketitems and totals, but preserve its step and change due?
          console.log('update transaction', transactionData);
          const transactions = this.transactionService.getTransactionsAsValue();
          const activeTransaction = transactions[this.checkoutTicket.transaction]
          const updatedTransaction = Object.assign(transactionData, { step: activeTransaction.step, changeDue: activeTransaction.changeDue })
          this.transactionService.updateTransaction(this.checkoutTicket.transaction, updatedTransaction)
        }
      },
      err => { console.log(err) }
    )
  }


  onSelection(method) {
    this.paymentMethod = method;
  }
}
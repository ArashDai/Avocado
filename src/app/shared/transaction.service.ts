import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  // status:
  // open:    a ticket is not fully paid
  // closed:  the transaction has been processed

  // when transactions are closed:
  // -transaction is removed from transactions array
  // -transaction is saved to database

  // when transaction is refunded:
  // -retrieve transaction from db
  // -update refund array 

  //need to manage:
  // how items are paid for cash or credit
  // how to refund items that were paid for with cash
  // how to pay for one specific item with cash


  transactions = {}

  private transactions$ = new BehaviorSubject(this.transactions);

  constructor(
    private api: ApiService,
    private ticketService: TicketService
  ) { }

  createTransaction(data) {
    // create a transaction and add it to transactions object
    const id = Date.now();

    this.transactions[id] = Object.assign(data, { key: id });
    this.transactions$.next(this.transactions);
    return this.transactions[id];
  }

  updateTransaction(transaction, data) {
    //transaction is a key, data is transaction data
    this.transactions[transaction] = data;
    this.transactions$.next(this.transactions);
  }

  applyCashPayment(transactionKey, currentItems, cashTendered, paymentData, selectedTotal) {

    let ticketsData = this.ticketService.getTicketsAsValue();
    let ticketItems = ticketsData.tickets[ticketsData.activeTicket];
    // create payment entry in db
    // apply payment id to items involved
    // update transaction in service and then in the database
    // remove transaction data from service

    this.api.post('payment', paymentData).subscribe(currentPayment => {

      if (cashTendered > selectedTotal) {
        console.log('cash tendered greater, there will be change, all items will be paid off');

        for (let item of currentItems) { // not complete yet
          item.balanceDue = 0;
          ticketItems = this._applyPaymentsHelper(ticketItems, item, currentPayment, false);
        }
        this.transactions[transactionKey]['step'] = 'change';
        this.transactions[transactionKey]['changeDue'] = cashTendered - selectedTotal;
        //update the ticketItems on the transaction
        this.transactions[transactionKey]['ticketItems'] = ticketItems;
        //update the transactions$ behavior subject
        this.updateTransaction(transactionKey, this.transactions[transactionKey]);

        this.ticketService.updateTicket(ticketItems);
        // nextStep = 'change';

      } else if (selectedTotal >= cashTendered) {
        console.log('cash tendered lower, there will be balance due, or it will be perfectly paid off')
        // there will be a balance due for an item, going back to 'payment selection' not 'change'

        for (let item of currentItems) {
          // Apply the payment to individual ticketItems
          if (item.balanceDue < cashTendered) {
            // The item will be paid off now

            selectedTotal = Math.abs(selectedTotal - item.balanceDue);
            cashTendered = Math.abs(item.balanceDue - cashTendered);
            ticketItems = this._applyPaymentsHelper(ticketItems, item, currentPayment, false);
            selectedTotal = this._calculateSelectedTotal(currentItems);

            console.log('updated ticket items, item paid', ticketItems);
            this.ticketService.updateTicket(ticketItems);

          } else {
            // there will be a balance due for this item

            item.balanceDue = Math.abs(item.balanceDue - cashTendered);
            cashTendered = 0;
            ticketItems = this._applyPaymentsHelper(ticketItems, item, currentPayment, true);
            selectedTotal = this._calculateSelectedTotal(currentItems);

            console.log('updated ticket items, balance due', ticketItems);
            this.ticketService.updateTicket(ticketItems);

          }
        }
        this.transactions[transactionKey]['step'] = this._checkBalanceDue(ticketItems)
        //update the ticketItems on the transaction
        this.transactions[transactionKey]['ticketItems'] = ticketItems;
        //update the transactions$ behavior subject
        this.updateTransaction(transactionKey, this.transactions[transactionKey]);
      }
    }, (err) => {
      console.log(err)
    })
  }

  refundCashPayment() {

  }

  refundCashItem() {

  }

  getTransactions() {
    return this.transactions$.asObservable();
  }

  getTransactionsAsValue() {
    return this.transactions$.value;
  }

  getTransaction(index) {
    return this.transactions[index];

  }

  completeTransaction(id, dialogRef) {

    let { step, balanceDue, changeDue, ...transaction } = this.transactions$.value[id];
    transaction = Object.assign(transaction, { status: "complete" });

    this.api.post('transaction', transaction).subscribe(
      (data) => {
        // If successful remove  the transaction and ticket
        console.log('transaction saved successfully');
        this.ticketService.deleteTicket();
        delete this.transactions[id];
        this.transactions$.next(this.transactions);
        dialogRef.close();
      },
      err => {
        console.log(err);
      }
    )
  }

  private _applyPaymentsHelper(items, item, currentPayment, balanceDue) {
    // Go over all ticketItems to apply payments on a specific item instance identified by timeStamp
    return items.map(c => {
      if (c.timeStamp === item.timeStamp) {
        c.payments.push({ paymentId: currentPayment._id, amount: currentPayment.amount });
        if (!balanceDue) c.balanceDue = 0;
      }
      return c;
    });
  }

  private _calculateSelectedTotal(currentItems) {
    // Returns total balance due of selected items
    return currentItems.reduce((acc, current) => { return acc + current.balanceDue }, 0);
  }

  private _checkBalanceDue(ticketItems) {
    // Check if any ticketItems have a balance due to determine next step
    let nextStep = 'reciept'
    ticketItems.forEach(element => element.balanceDue > 0 ? nextStep = 'selection' : null);
    return nextStep;
  }
}
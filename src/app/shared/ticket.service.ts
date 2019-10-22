import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TicketService {

  ticketsData = {
    activeTicket: 0,
    tickets: [[]],
    totals: [{ subtotal: 0, tax: 0, total: 0 }],
    transactions: []
  };

  private ticketsData$ = new BehaviorSubject(this.ticketsData);

  constructor(
    private api: ApiService
  ) { }

  getTickets() {
    return this.ticketsData$.asObservable();
  }

  getTicketsAsValue() {
    return this.ticketsData$.value;
  }

  addTicket() {
    this.ticketsData = {
      activeTicket: this.ticketsData.activeTicket,
      tickets: [...this.ticketsData.tickets, []],
      totals: [...this.ticketsData.totals, { subtotal: 0, tax: 0, total: 0 }],
      transactions: [...this.ticketsData.transactions]
    }
    this.ticketsData$.next(this.ticketsData);
  }

  changeActiveTicket(ticketIndex) {
    this.ticketsData.activeTicket = ticketIndex;
    this.ticketsData$.next(this.ticketsData);
  }

  addItem(newItem) {

    let subtotal = newItem['price'];
    let taxes = [];
    let taxTotal = 0;
    let flatTaxes = 0;

    if (!newItem['taxes'].length && !newItem['modifiers'].length && !newItem['options'].length) {
      // if item has no modifiers options or taxes
      this._addItemHelper(newItem, subtotal, taxTotal, flatTaxes);
    } else {
      // otherwise need to grab fees and taxes
      this._requestPrices(newItem).subscribe((value: Array<any>) => {
        value.forEach(priceModifier => {
          if (priceModifier.rate !== undefined) {
            taxes.push(priceModifier.rate)
          } else if (priceModifier.flatrate !== undefined) {
            flatTaxes += priceModifier.flatrate;
          } else {
            subtotal += priceModifier.fee;
          }
        });
        taxes.forEach(tax => taxTotal += subtotal * tax);
        this._addItemHelper(newItem, subtotal, taxTotal, flatTaxes);
      }, (err) => {
        console.log(err);
      });
    }
  }

  deleteItem(ticketIndex, itemIndex) {
    //delete item and recalculate total price for ticket
    console.log('deleting item', this.ticketsData.tickets[ticketIndex][itemIndex], 'check balance due')
    //if balance due is less than total a refund is due

    this.ticketsData.totals[this.ticketsData.activeTicket].tax -= this.ticketsData.tickets[ticketIndex][itemIndex]['tax'];
    this.ticketsData.totals[this.ticketsData.activeTicket].subtotal -= this.ticketsData.tickets[ticketIndex][itemIndex]['subtotal'];
    this.ticketsData.totals[this.ticketsData.activeTicket].total -= this.ticketsData.tickets[ticketIndex][itemIndex]['total'];

    this.ticketsData.tickets[ticketIndex].splice(itemIndex, 1);
    this.ticketsData$.next(this.ticketsData);
  }

  deleteTicket(ticketIndex?) {
    //delete active ticket, if last ticket add an empty one
    if (!ticketIndex) ticketIndex = this.ticketsData.activeTicket;
    this.ticketsData.tickets.splice(ticketIndex, 1);
    this.ticketsData.totals.splice(ticketIndex, 1);
    this.ticketsData.transactions.splice(ticketIndex, 1);

    if (this.ticketsData.tickets.length === 0) {
      this.ticketsData = {
        activeTicket: 0,
        tickets: [[]],
        totals: [{ subtotal: 0, tax: 0, total: 0 }],
        transactions: []
      };
    }
    this.ticketsData$.next(this.ticketsData);
  }

  updateTicket(newTicket) {
    // update the active ticket
    this.ticketsData.tickets.splice(this.ticketsData.activeTicket, 1, newTicket)
    this.ticketsData$.next(this.ticketsData);
  }

  assignTransaction(transactionId) {
    //assign a transaction to the active ticket
    this.ticketsData.transactions[this.ticketsData.activeTicket] = transactionId;
    this.ticketsData$.next(this.ticketsData);
  }

  private _requestPrices(item: object): Observable<any> {
    //requests tax rates and prices of modifiers and components
    let priceModifiers = [];

    for (let property in item) {
      switch (property) {
        case 'modifiers':
        case 'options':
          item[property].map(name => priceModifiers.push({ db: property.slice(0, -1), name }));
          break;
        case 'taxes':
          item[property].map(name => priceModifiers.push({ db: property.slice(0, -2), name }));
          break;
        default:
          break;
      }
    }

    return of(priceModifiers).pipe(
      mergeMap(q => forkJoin(...q.map((c) => this.api.getByName(c.db, c.name))))
    )
  }

  private _addItemHelper(newItem, subtotal, taxTotal, flatTaxes) {
    // updates ticket adding an item, calculates total
    const total = subtotal + taxTotal + flatTaxes;
    const item = Object.assign(newItem, { balanceDue: total, total, subtotal, tax: taxTotal, payments: [] });

    this.ticketsData.tickets[this.ticketsData.activeTicket] = [...this.ticketsData.tickets[this.ticketsData.activeTicket], item];

    this.ticketsData.totals[this.ticketsData.activeTicket].tax += item.tax;
    this.ticketsData.totals[this.ticketsData.activeTicket].subtotal += item.subtotal;
    this.ticketsData.totals[this.ticketsData.activeTicket].total += item.total;

    this.ticketsData$.next(this.ticketsData);
  }

}
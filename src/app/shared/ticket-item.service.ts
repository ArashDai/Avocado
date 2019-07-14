import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const initialTickets = [[]];


@Injectable({
  providedIn: 'root',
})   
export class TicketItemService {

  activeTicket = 0;
  tickets = [...initialTickets];

  private tickets$ = new BehaviorSubject(initialTickets);

  constructor(private api: ApiService) { }

  getTickets() {
    return this.tickets$.asObservable();
  }

  getTicket(ticketIndex){
    return this.tickets$.getValue().findIndex(ticketIndex);
  }

  addTicket() {
    this.tickets = [...this.tickets, []];
    this.tickets$.next(this.tickets);
  }

  changeActiveTicket(ticketIndex){
    this.activeTicket = ticketIndex;
  }

  addItem(newItem){
    console.log('inside add item newItem:',newItem)

    let subtotal = newItem['price'];
    let taxes = [];
    let taxTotal = 0;
    let flatTaxes = 0;

    if(!newItem['taxes'].length && !newItem['modifiers'].length && !newItem['options'].length){
      //item has no modifiers options or taxes
      this._updateTicket(newItem, subtotal, taxTotal, flatTaxes);
    } else {
      this._requestPrices(newItem).subscribe((value: Array<any>) => {
        value.forEach( priceModifier => {
          if(priceModifier.rate !== undefined){
            taxes.push(priceModifier.rate)
          } else if( priceModifier.flatrate !== undefined){
            flatTaxes += priceModifier.flatrate;
          } else {
            subtotal += priceModifier.fee;
          }
        });
        taxes.forEach( tax => taxTotal += subtotal*tax );

        this._updateTicket(newItem, subtotal, taxTotal, flatTaxes);
      });
    }
  }

  removeItem(ticketIndex, itemIndex){
    this.tickets[ticketIndex].splice(itemIndex,1);
    this.tickets$.next(this.tickets);
  }

  removeTicket(ticketIndex){
    this.tickets.splice(ticketIndex,1);
    this.tickets$.next(this.tickets);
  }

  private _requestPrices(item: object): Observable<any> {
    //requests tax rates and prices of modifiers, and components
    let priceModifiers = [];

    for(let property in item){
      switch(property){
        case 'modifiers':
        case 'options':
          item[property].map( name => priceModifiers.push({db: property.slice(0, -1), name }) );
        break;
        case 'taxes':
          item[property].map( name => priceModifiers.push({db: property.slice(0, -2), name }) );
        break;
        default:
        break;
      }
    }

    return of(priceModifiers).pipe(
      mergeMap( q => forkJoin( ...q.map((c) => this.api.getByName(c.db, c.name)) ) )
    )
  }

  private _updateTicket(newItem, subtotal, taxTotal, flatTaxes){
    //calculate total, update item and tickets
    const total = subtotal + taxTotal + flatTaxes;
    const item = Object.assign(newItem, {total, subtotal, tax:taxTotal});

    this.tickets[this.activeTicket] = [...this.tickets[this.activeTicket],item];
    this.tickets$.next(this.tickets);
  }

}
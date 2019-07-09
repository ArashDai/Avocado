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

  addItem(itemIndex){
    let subtotal = itemIndex['price'];
    let taxes = [];
    let taxTotal = 0;
    let flatTaxes = 0;
    //in the future remove the subscribe callback from here and just call it with value, move it below calculatePrice
    this.calculatePrice(itemIndex).subscribe((value: Array<any>) => {
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

      const total = subtotal + taxTotal + flatTaxes;
      const item = Object.assign(itemIndex, {total, subtotal, tax:taxTotal});

      this.tickets[this.activeTicket] = [...this.tickets[this.activeTicket],item];
      this.tickets$.next(this.tickets);
    });
  }

  removeItem(ticketIndex, itemIndex){
    this.tickets[ticketIndex].splice(itemIndex,1);
    this.tickets$.next(this.tickets);
  }

  removeTicket(ticketIndex){
    this.tickets.splice(ticketIndex,1);
    this.tickets$.next(this.tickets);
  }

  calculatePrice(item: object): Observable<any> {
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
      }
    }

    return of(priceModifiers).pipe(
      mergeMap( q => forkJoin( ...q.map((c) => this.api.getByName(c.db, c.name)) ) )
    )
  }

}
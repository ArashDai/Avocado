import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})   

export class TicketItemService {

  activeTicket = 0;
  
  ticketsData = {
    tickets:[[]],
    totals:[{subtotal:0, tax:0, total:0}]
  };

  private ticketsData$ = new BehaviorSubject(this.ticketsData);

  constructor(private api: ApiService) { }

  getTickets(){
    return this.ticketsData$.asObservable();
  }

  addTicket(){
    this.ticketsData = {
     tickets: [...this.ticketsData.tickets, []],
     totals: [...this.ticketsData.totals, {subtotal:0, tax:0, total:0}]
    }
    this.ticketsData$.next(this.ticketsData);
  }

  changeActiveTicket(ticketIndex){
    this.activeTicket = ticketIndex;
  }

  addItem(newItem){

    let subtotal = newItem['price'];
    let taxes = [];
    let taxTotal = 0;
    let flatTaxes = 0;

    if(!newItem['taxes'].length && !newItem['modifiers'].length && !newItem['options'].length){
      // if item has no modifiers options or taxes
      this._addItemHelper(newItem, subtotal, taxTotal, flatTaxes);
    } else {
      // otherwise need to grab fees and taxes
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
        this._addItemHelper(newItem, subtotal, taxTotal, flatTaxes);
      });
    }
  }

  deleteItem(ticketIndex, itemIndex){
    //delete item and recalculate total price for ticket
    this.ticketsData.totals[this.activeTicket].tax -= this.ticketsData.tickets[ticketIndex][itemIndex]['tax'];
    this.ticketsData.totals[this.activeTicket].subtotal -= this.ticketsData.tickets[ticketIndex][itemIndex]['subtotal'];
    this.ticketsData.totals[this.activeTicket].total -= this.ticketsData.tickets[ticketIndex][itemIndex]['total'];

    this.ticketsData.tickets[ticketIndex].splice(itemIndex,1);
    this.ticketsData$.next(this.ticketsData);
  }

  deleteTicket(ticketIndex){
    //delete active ticket, if last ticket add an empty one
    this.ticketsData.tickets.splice(ticketIndex,1);
    this.ticketsData.totals.splice(ticketIndex,1);
    if(this.ticketsData.tickets.length === 0){
      this.ticketsData = {
        tickets:[[]],
        totals:[{subtotal:0, tax:0, total:0}]
      };
    }
    this.ticketsData$.next(this.ticketsData);
  }

  private _requestPrices(item: object): Observable<any> {
    //requests tax rates and prices of modifiers and components
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

  private _addItemHelper(newItem, subtotal, taxTotal, flatTaxes){
    // updates ticket adding an item, calculates total
    const total = subtotal + taxTotal + flatTaxes;
    const item = Object.assign(newItem, {total, subtotal, tax:taxTotal});

    this.ticketsData.tickets[this.activeTicket] = [...this.ticketsData.tickets[this.activeTicket],item];

    this.ticketsData.totals[this.activeTicket].tax += item.tax;
    this.ticketsData.totals[this.activeTicket].subtotal += item.subtotal;
    this.ticketsData.totals[this.activeTicket].total += item.total;

    this.ticketsData$.next(this.ticketsData);
  }

}
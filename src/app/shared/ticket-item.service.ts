import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const initialTickets = [[]];


@Injectable({
  providedIn: 'root',
})   
export class TicketItemService {

  activeTicket = 0;
  tickets = [...initialTickets];

  private tickets$ = new BehaviorSubject(initialTickets);

  constructor() { }

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
    //adds an item to currently active ticket
    this.tickets[this.activeTicket] = [...this.tickets[this.activeTicket],itemIndex]
    this.tickets$.next(this.tickets);
  }

  removeItem(ticketIndex, itemIndex){
    this.tickets[ticketIndex].splice(itemIndex,1);
    this.tickets$.next(this.tickets);
  }

  removeTicket(ticketIndex){
    this.tickets.splice(ticketIndex,1);
    this.tickets$.next(this.tickets);
  }

}
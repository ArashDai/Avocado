import { Component, OnInit } from '@angular/core';

import { TicketItemService } from '../../../shared/ticket-item.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.css']
})
export class RegisterTicketComponent implements OnInit {

  activeTicket = 0;
  tickets = [];
  totals = [];



  constructor( 
    private ticketItemService :TicketItemService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.ticketItemService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      // this.ticketTotal = tickets[this.activeTicket].reduce((acc, c) => { return acc + c['total']},0)
      // i need to assign ticketTotal, ticketTaxTotal, ticketSubTotal
      // the totals need to be added to the ticket
      let ticketTotal = 0;
      let ticketTaxTotal = 0;
      let ticketSubtotal = 0;

      tickets[this.activeTicket].forEach( c => {
        ticketTotal += c.total;
        ticketTaxTotal += c.tax;
        ticketSubtotal += c.subtotal;
      })

      this.totals[this.activeTicket] = {total: ticketTotal, subtotal: ticketSubtotal, tax: ticketTaxTotal};
      console.log('the ticket is currently: ',this.tickets, ticketTotal, this.totals);

    })

  }

  addTicket(){
    this.ticketItemService.addTicket();
    this.totals.push([]);
  }

  removeTicket(){
    
  }

  setActiveTicket(ticket){
    this.activeTicket = ticket;
    this.ticketItemService.changeActiveTicket(ticket)
  }

}

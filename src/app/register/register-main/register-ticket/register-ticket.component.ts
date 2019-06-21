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
  constructor( 
    private ticketItemService :TicketItemService,
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log('inside register-ticket')
    this.ticketItemService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      console.log('the ticket is currently: ',this.tickets)
    })

  }

  addTicket(){
    this.ticketItemService.addTicket();
    console.log('creating ticket');
  }

  setActiveTicket(ticket){
    this.activeTicket = ticket;
    this.ticketItemService.changeActiveTicket(ticket)
  }

}

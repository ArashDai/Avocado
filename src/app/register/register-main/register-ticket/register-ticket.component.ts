import { Component, OnInit } from '@angular/core';
import { TicketItemService } from '../../../shared/ticket-item.service';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.css']
})

export class RegisterTicketComponent implements OnInit {

  activeTicket = 0;
  ticketsData = {
    tickets:[[]],
    totals:[{subtotal:0, tax:0, total:0}]
  };
  
  constructor( 
    private ticketItemService :TicketItemService
  ) { }

  ngOnInit() {
    this.ticketItemService.getTickets().subscribe(tickets => this.ticketsData = tickets)
  }

  deleteItem(itemIndex){
    this.ticketItemService.deleteItem(this.activeTicket,itemIndex)
  }

  addTicket(){
    this.ticketItemService.addTicket();
  }

  deleteTicket(){
    this.ticketItemService.deleteTicket(this.activeTicket);
  }

  setActiveTicket(ticket){
    this.activeTicket = ticket;
    this.ticketItemService.changeActiveTicket(ticket)
  }

}

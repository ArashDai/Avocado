import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

import { TicketItemService } from '../../../shared/ticket-item.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

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
    private cp: CurrencyPipe,
    private ticketItemService: TicketItemService,
    public dialog: MatDialog
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

    if(!this.ticketsData.tickets[this.activeTicket]){
      this.activeTicket--;
      this.ticketItemService.changeActiveTicket(this.activeTicket);
    } 
  }

  setActiveTicket(ticket){
    this.activeTicket = ticket;
    this.ticketItemService.changeActiveTicket(ticket)
  }

  checkout(){
    // a lot of work to do here
    // pass the ticket to the dialog component
    // dialog component needs logic to deal with checkout operations

    console.log('opening checkout dialog');

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '45%',
      data: {
        // ticket: this.activeTicket
        dialogType:'checkout',
        dialog:this
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The checkout dialog was closed');
    });
  }

}

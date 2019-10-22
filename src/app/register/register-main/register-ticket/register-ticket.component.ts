import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

import { TicketService } from '../../../shared/ticket.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.css']
})

export class RegisterTicketComponent implements OnInit {


  ticketsData = {
    activeTicket: 0,
    tickets: [[]],
    totals: [{ subtotal: 0, tax: 0, total: 0 }]
  };

  constructor(
    private cp: CurrencyPipe,
    private ticketService: TicketService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(data => {
      console.log('tickets data', data);
      this.ticketsData = data;
    })
  }

  deleteItem(itemIndex) {
    this.ticketService.deleteItem(this.ticketsData.activeTicket, itemIndex)
  }

  addTicket() {
    this.ticketService.addTicket();
  }

  deleteTicket() {
    this.ticketService.deleteTicket(this.ticketsData.activeTicket);

    if (!this.ticketsData.tickets[this.ticketsData.activeTicket]) {
      this.ticketsData.activeTicket--;
      this.ticketService.changeActiveTicket(this.ticketsData.activeTicket);
    }
  }

  setActiveTicket(ticket) {
    this.ticketsData.activeTicket = ticket;
    this.ticketService.changeActiveTicket(ticket)
  }

  checkout() {
    if (this.ticketsData.tickets[this.ticketsData.activeTicket].length > 0) {
      //only open checkout dialog if there are items in the ticket
      console.log('opening checkout dialog');

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '100vw',
        data: {
          ticket: this.ticketsData.activeTicket,
          dialogType: 'checkout',
          dialog: this
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The checkout dialog was closed', result);
      });
    }
  }

}

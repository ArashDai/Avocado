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

  activeTicket = 0;
  ticketsData = {
    tickets:[[]],
    totals:[{subtotal:0, tax:0, total:0}]
  };
  
  constructor( 
    private cp: CurrencyPipe,
    private ticketService: TicketService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(tickets => this.ticketsData = tickets)
  }

  deleteItem(itemIndex){
    this.ticketService.deleteItem(this.activeTicket,itemIndex)
  }

  addTicket(){
    this.ticketService.addTicket();
  }

  deleteTicket(){
    this.ticketService.deleteTicket(this.activeTicket);

    if(!this.ticketsData.tickets[this.activeTicket]){
      this.activeTicket--;
      this.ticketService.changeActiveTicket(this.activeTicket);
    } 
  }

  setActiveTicket(ticket){
    this.activeTicket = ticket;
    this.ticketService.changeActiveTicket(ticket)
  }

  checkout(){

    console.log('opening checkout dialog');

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      data: {
        ticket: this.activeTicket,
        dialogType:'checkout',
        dialog:this
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The checkout dialog was closed');
    });
  }

}

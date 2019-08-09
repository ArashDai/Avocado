import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';


@Component({
  selector: 'app-cash-checkout',
  templateUrl: './cash-checkout.component.html',
  styleUrls: ['./cash-checkout.component.css']
})

export class CashCheckoutComponent implements OnInit {

  totals: any;

  constructor( private ticketService: TicketService) { }

  ngOnInit() {
    let x = this.ticketService.getActiveTicket();
    console.log(x);

  }

}

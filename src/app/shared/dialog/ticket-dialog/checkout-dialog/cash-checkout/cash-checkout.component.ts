import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from 'src/app/shared/ticket.service';
import { ApiService } from 'src/app/api.service';
import { TransactionService } from 'src/app/shared/transaction.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ItemCreateComponent } from 'src/app/menu/item-create/item-create.component';
import { UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-cash-checkout',
  templateUrl: './cash-checkout.component.html',
  styleUrls: ['./cash-checkout.component.css']
})

export class CashCheckoutComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'balanceDue'];
  cashTendered = new FormControl(0);
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  step: any;
  transaction: any;
  transactions: any;
  transactionKey: any;
  ticketsData: any;
  ticketItems: any;
  ticket: any;
  totals: any;
  selectedTotal: number;
  changeDue: number;

  @Input() dialogRef: any;

  constructor(
    private ticketService: TicketService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    // next step continue cash checkout
    // change calculator, reciept generator

    // when multiple items are selected for partial payment how do i handle it?
    // e.g. want to pay half of entire ticket with cash and half with card
    // subtract the whole ticketItem amount from the cash  payment
    // if ticket total is 20 and customer tenders 15 in cash
    // subtract ticketItem cost from cashTendered until one item has a partial payment
    // item1 total = 10  , cash tendered -= item1.total , save item1 in db as paid cash
    // item2 total = 10 , cash tendered -= item1.total,  set amount due item2 as $5, save payment as partial cash

    // add payments to transaction object, save transaction

    this.ticketService.getTickets().subscribe(data => {

      this.ticketsData = data;
      this.ticket = data.tickets[data.activeTicket];
      this.ticketItems = data.tickets[data.activeTicket];
      this.transactionKey = this.ticketsData.transactions[data.activeTicket]

      this.transactionService.getTransactions().subscribe(data => {
        this.transaction = data[this.transactionKey];
        this.step = this.transaction.step;
        console.log('ticketItems', this.ticketItems);
        console.log('ticketData', this.ticketsData);
        console.log('transaction', this.transaction);
        console.log('change due in cash checkout transaction', this.transaction.changeDue)
      })
      this.dataSource = new MatTableDataSource(this.ticketItems);
    })
    //select all by default
    this.masterToggle();
  }

  checkUnpaidItems() {
    // check items for remaining balance due refactor later to use balance due on transaction service
    let nextStep = 'reciept';

    this.ticket.forEach(element => element.balanceDue > 0 ? nextStep = 'selection' : null);

    this.transactionService.updateTransaction(this.transactionKey, Object.assign(this.transaction, { changeDue: 0, step: nextStep }));
    this.formatInput();
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkout() {
    console.log('selected for payment', this.selection);
    this.step = 'payment';
    this.calculateTotal();
  }

  calculateTotal() {
    this.selectedTotal = this.selection.selected.reduce((acc, current) => { return acc + current.balanceDue }, 0);
  }

  clear() {
    this.cashTendered.setValue(null)
  }

  formatInput() {
    this.cashTendered.setValue((this.cashTendered.value / 100).toFixed(2));
  }

  submitPayment() {
    //convert cash tendered to cents
    let currentItems = this.selection.selected;
    let cashTendered = Number(this.cashTendered.value) * 100;
    let paymentData = { type: 'cash', status: 'paid', amount: Number(this.cashTendered.value) * 100 }

    this.transactionService.applyCashPayment(this.transactionKey, currentItems, cashTendered, paymentData, this.selectedTotal);
  }

  completeTransaction() {
    // use transaction service to:
    // save the transaction to the transactions database
    // remove transaction from transaction service
    // use ticketservice to:
    // remove the ticket from ticket service
    this.transactionService.completeTransaction(this.transactionKey, this.dialogRef);
  }

}
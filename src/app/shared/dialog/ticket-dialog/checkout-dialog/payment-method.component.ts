import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-payment-method',
  template: `
    <div>
        <h2>Select Payment Method</h2>
        
        <button mat-raised-button color="primary" (click)="paymentType('cash')" >Cash</button>
        <button mat-raised-button color="primary" (click)="paymentType('credit')" >Credit</button>
        
    </div>
  `,
  styleUrls: []
})

export class PaymentMethodComponent implements OnInit {

  @Output() paymentSelected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {

  }

  paymentType(type) {
    this.paymentSelected.emit(type);
  }

}

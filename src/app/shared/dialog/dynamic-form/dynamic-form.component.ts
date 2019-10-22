import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DialogQuestionBase } from '../dialog-question-base';
import { DialogQuestionControlService } from '../dialog-question-control.service';

import { TicketService } from '../../ticket.service';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DialogQuestionControlService]
})

export class DynamicFormComponent implements OnInit {

  @Input() questions: DialogQuestionBase<any>[] = [];
  @Input() dialogType: string;
  @Input() item: any;
  @Input() type: string;
  @Input() name: string;
  @Input() description: string;
  @Input() dialog: any;
  form: FormGroup;
  payload: any;

  constructor(
    private qcs: DialogQuestionControlService,
    private ticketService: TicketService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    // Replaces nulls with empty arrays
    this.questions.map(c => {
      if (c.controlType === 'dropdown') this.form.setValue(Object.assign(this.form.value, { [c.key]: [] }));
    })
  }

  onSubmit() {
    this.payload = this.form.value;

    if (this.dialogType === 'menu-selection') {
      // Send the payload to the register ticket component with TicketService
      this.ticketService.addItem({ ...this.item, ...this.payload, timeStamp: Date.now() });

      this._resetStep();
    }
    this.dialog.close()
  }

  private _resetStep() {
    // If the ticket has a transaction and it recieves a new item, set the step of the transaction to selection
    const ticketsData = this.ticketService.getTicketsAsValue();
    const activeTransactionKey = ticketsData.transactions[ticketsData.activeTicket];

    if (activeTransactionKey) {
      const transactions = this.transactionService.getTransactionsAsValue();
      const activeTransaction = Object.assign(transactions[activeTransactionKey], { step: 'selection' });
      this.transactionService.updateTransaction(activeTransactionKey, activeTransaction);
    }
  }

}
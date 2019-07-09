import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { ApiService } from '../../../api.service';
import { DialogQuestionBase }              from '../dialog-question-base';
import { DialogQuestionControlService }    from '../dialog-question-control.service';

import { TicketItemService } from '../../ticket-item.service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ DialogQuestionControlService ]
})

export class DynamicFormComponent implements OnInit {

  @Input() questions: DialogQuestionBase<any>[] = [];
  @Input() dialogType:string;
  @Input() item:any;
  @Input() type:string;
  @Input() name:string;
  @Input() dialog:any;
  form: FormGroup;
  payload:any;
 
  constructor(
    private api: ApiService,
    private qcs: DialogQuestionControlService,
    private ticketItemService: TicketItemService  
  ) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    //replaces nulls with empty arrays
    this.questions.map( c => {
      if(c.controlType === 'dropdown') this.form.setValue(Object.assign(this.form.value,{[c.key]: []}));
    })
  }
 
  onSubmit() {
    console.log('FORM', this);
    this.payload = this.form.value;
    if( this.dialogType === 'menu-selection' ){
      //send the payload to the register ticket component with ItemTicketService
      console.log('let me see the payload', this.payload,'and item', this.item);
      //right here calculate the final price for this item
      //based on base price + option fees + modifier fees?
      this.ticketItemService.addItem({...this.item, ...this.payload}); 
    }
    this.dialog.close()
  }

}
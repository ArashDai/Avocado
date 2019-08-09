import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { ApiService } from '../../../api.service';
import { DialogQuestionBase }              from '../dialog-question-base';
import { DialogQuestionControlService }    from '../dialog-question-control.service';

import { TicketService } from '../../ticket.service';
 
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
    private ticketService: TicketService  
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
      console.log('should be adding item now')
      //send the payload to the register ticket component with TicketService
      this.ticketService.addItem({...this.item, ...this.payload}); 
    }
    this.dialog.close()
  }

}
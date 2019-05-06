import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { ApiService } from '../../../api.service';
import { DialogQuestionBase }              from '../dialog-question-base';
import { DialogQuestionControlService }    from '../dialog-question-control.service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ DialogQuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: DialogQuestionBase<any>[] = [];
  @Input() type:string;
  @Input() name:string;
  @Input() dialog:any;
  form: FormGroup;
  payload = '';
 
  constructor(
    private api: ApiService,
    private qcs: DialogQuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.patchValue({'name':this.name});
  }
 
  onSubmit() {

    this.payload = this.form.value;

    this.api.post(this.type, this.payload)
      .subscribe(res => {
        this.dialog.close(res);
      }, (err) => {
        console.log(err);
      });
  }
}
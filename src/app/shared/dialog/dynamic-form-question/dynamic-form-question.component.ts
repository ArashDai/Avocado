import { Component, Input ,OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { DialogQuestionBase }     from '../dialog-question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: DialogQuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  ngOnInit(){
  }
}
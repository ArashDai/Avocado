import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DialogQuestionBase } from './dialog-question-base';

@Injectable()
export class DialogQuestionControlService {
  constructor() { }

  toFormGroup(questions: DialogQuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
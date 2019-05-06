import { DialogQuestionBase } from './dialog-question-base';

export class DialogTextboxQuestion extends DialogQuestionBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
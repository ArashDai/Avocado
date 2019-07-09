import { Injectable }       from '@angular/core';
import { ApiService } from '../../api.service';

import { DialogDropdownQuestion } from './dialog-question-dropdown';
import { DialogQuestionBase }     from './dialog-question-base';
import { DialogTextboxQuestion }  from './dialog-question-textbox';

import { complexMenuItemQuestions } from './dynamic-form-question-data/complex-menu-item-questions';
import { simpleMenuItemQuestions } from './dynamic-form-question-data/simple-menu-item-questions';

import { _getOptionScrollPosition } from '@angular/material';

@Injectable()
export class DialogQuestionService {

  constructor( private api: ApiService){}

  questionGenerator(dialogQuestion, options){
    let questions = [];
    if(dialogQuestion.textbox){
      dialogQuestion.textbox.forEach(element => {
        questions.push(new DialogTextboxQuestion(element))
      });
    }

    if(options){
      dialogQuestion.dropdown.forEach(element => {
        options[element['key']] ? element['options'] = options[element['key']].map( c => { return {'key':c, 'value': c} }) : null;
        //options can be additions
        if(element['key'] === 'additions'){
          options['options'] ? element['options'] = options['options'].map( c => { return {'key':c, 'value': c} }) : null;
        } else if( element['key'] === 'removals'){
        //components can be removals
          options['components'] ? element['options'] = options['components'].map( c => { return {'key':c, 'value': c} }) : null;
        }
        questions.push(new DialogDropdownQuestion(element))
      });
    }
    return questions;
  }

  getQuestions( type, options) {
    let questions = [];
    switch  (type){
      case 'complex':
        questions = questions.concat(this.questionGenerator(complexMenuItemQuestions, options));
        break;
      case 'simple':
        questions = questions.concat(this.questionGenerator(simpleMenuItemQuestions, null));
        break;
    }
    return questions.sort((a, b) => a.order - b.order);
  }
}
import { Injectable }       from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../api.service';

import { DialogDropdownQuestion } from './dialog-question-dropdown';
import { DialogQuestionBase }     from './dialog-question-base';
import { DialogTextboxQuestion }  from './dialog-question-textbox';

import { complexMenuItemQuestions } from './dynamic-form-question-data/complex-menu-item-questions';
import { simpleMenuItemQuestions } from './dynamic-form-question-data/simple-menu-item-questions';
import { taxQuestions } from './dynamic-form-question-data/tax-questions';
import { categoryQuestions } from './dynamic-form-question-data/category-questions';
import { optionQuestions } from './dynamic-form-question-data/option-questions';
import { componentQuestions } from './dynamic-form-question-data/component-questions';
import { modifierQuestions } from './dynamic-form-question-data/modifier-questions';
import { _getOptionScrollPosition } from '@angular/material';

@Injectable()
export class DialogQuestionService {

  constructor( private api: ApiService){}

  questionGenerator(dialogQuestion, options){
    let questions = [];
    console.log('dialogQuestion', dialogQuestion);
    if(dialogQuestion.textbox){
      dialogQuestion.textbox.forEach(element => {
        questions.push(new DialogTextboxQuestion(element))
      });
    }

    if(options){
      dialogQuestion.dropdown.forEach(element => {
        console.log('inside DialogQuestion dropdown maker', element, options, options[element['key']],'SUPER', element['key'])
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
        console.log('need to fix question generator to work with complexMenuItemQuestions and simpleMenuItemQuestions');
        questions = questions.concat(this.questionGenerator(complexMenuItemQuestions, options));
        break;
      case 'simple':
        console.log(' simple , no options are needed pass null');
        questions = questions.concat(this.questionGenerator(simpleMenuItemQuestions, null));
        break;
    }
    return questions.sort((a, b) => a.order - b.order);
  }
}
import { Injectable }       from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../api.service';

import { DialogDropdownQuestion } from './dialog-question-dropdown';
import { DialogQuestionBase }     from './dialog-question-base';
import { DialogTextboxQuestion }  from './dialog-question-textbox';

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
    dialogQuestion.textbox.forEach(element => {
      questions.push(new DialogTextboxQuestion(element))
    });

    dialogQuestion.dropdown.forEach(element => {
      element['options'] = options[element['label']].map( c => { return {'key':c, 'value': c} });
      questions.push(new DialogDropdownQuestion(element))
    });
    return questions;
  }

  getQuestions( type, options) {
    let questions = [];
    //type will be either option, modifier, category, tax, component, OR addToTicketSimple, addToTicketComplex
    switch  (type){
      case 'tax' : 
        questions = questions.concat(this.questionGenerator(taxQuestions, options));
        break;

      case 'category' : 
        questions = questions.concat(this.questionGenerator(categoryQuestions, options));
        break;

      case 'option' :
        questions = questions.concat(this.questionGenerator(optionQuestions, options));      
        break;
      
      case 'component' : 
        questions = questions.concat(this.questionGenerator(componentQuestions, options));
        break;

      case 'modifier' :
        questions = questions.concat(this.questionGenerator(modifierQuestions, options));
        break;
    }
    return questions.sort((a, b) => a.order - b.order);
  }
}
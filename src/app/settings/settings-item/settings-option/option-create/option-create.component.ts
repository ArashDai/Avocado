import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material'
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../../../api.service';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {

  visible     = true;
  selectable  = true;
  removable   = true;
  addOnBlur   = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  categoryList = [];
  option = {};
  optionCreateForm: FormGroup;

  categoryCtrl  = new FormControl();

  filteredCategories: Observable<string[]>;

  selectedCategories: any[] = [];

  pageType = 'Create';
  id = this.route.snapshot.params['id'];

  @ViewChild('categoryInput')  categoryInput:  ElementRef<HTMLInputElement>;
  @ViewChild('autoCategory')  autoCategory:  MatAutocomplete;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
    ) {
    this.createForm();

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe( 
      startWith(null),
      map((category: string | null) => category ? this._filter(category, 'categoryList') : this.categoryList.slice() )
    );

   }

  ngOnInit() {
    this.setupForm(this.id);
  }

  setupForm(id) {

    this.api.getAll('Category').subscribe( 
      categories => this.categoryList = categories.map(c => c.name)
    );
    
    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      this.api.get('Option',id).subscribe( 
        option => {
          this.selectedCategories = option.categories;

          this.optionCreateForm.patchValue(option);
        });
    }
  }

  createForm(){
    this.optionCreateForm = this.fb.group({
      name: '',
      description: '',
      type:'',
      categories:[],
      fee: 0
    });
  }

  add(event: MatChipInputEvent, ctrl, type): void { 
    let autoComplete
    switch(type){
      case 'category':
        autoComplete = this.autoCategory;
        break;
    }

    if(!autoComplete.isOpen){

      if (event.input) {
        event.input.value = '';
      }
      this[ctrl].setValue(null);
    } 
  }

  remove(item: string, type): void {
    const index = this[type].indexOf(item);

    if (index >= 0) {
      this[type].splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, selectedItems, inputType, ctrl): void {
    if ( this[selectedItems].indexOf(event.option.viewValue) < 0 ){
      this[selectedItems].push(event.option.viewValue);
    }
    this[inputType].nativeElement.value = '';
    this[ctrl].setValue(null);
  }

  private _filter(value: string, type): string[] {
    const filterValue = value.toLowerCase();
    return this[type].filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  private _replaceNulls(item) {
    // there should be a better way to do this
    for (let property in item){
      switch( property ) {
        case 'categories': 
        case 'components': 
        case 'modifiers': 
        case 'options': 
        case 'taxes': 
        case 'types': 
          item[property] = [];
      }
    }
  }

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      this._replaceNulls(form);
      this.api.post('Option', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/options/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      this.api.update('Option', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/options/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { forkJoin, Observable } from 'rxjs/';
import { Router, ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../../../api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



@Component({
  selector: 'app-component-create',
  templateUrl: './component-create.component.html',
  styleUrls: ['./component-create.component.css']
})

export class ComponentCreateComponent implements OnInit {

  visible     = true;
  selectable  = true;
  removable   = true;
  addOnBlur   = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  component = {};
  optionList = [];
  categoryList = [];

  optionCtrl    = new FormControl();
  categoryCtrl  = new FormControl();

  filteredOptions:    Observable<string[]>;
  filteredCategories: Observable<string[]>;

  selectedOptions:    any[] = [];
  selectedCategories: any[] = [];

  componentCreateForm: FormGroup;
  pageType = 'Create';
  id = this.route.snapshot.params['id'];

  @ViewChild('optionInput')    optionInput:    ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput')  categoryInput:  ElementRef<HTMLInputElement>;

  @ViewChild('autoOption')    autoOption:    MatAutocomplete;
  @ViewChild('autoCategory')  autoCategory:  MatAutocomplete;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
    ){
    this.createForm();

    this.filteredOptions = this.optionCtrl.valueChanges.pipe( 
      startWith(null),
      map((option: string | null) => option ? this._filter(option, 'optionList') : this.optionList.slice() )
    );

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe( 
      startWith(null),
      map((category: string | null) => category ? this._filter(category, 'categoryList') : this.categoryList.slice() )
    );
  }

  ngOnInit() {
    this.setupForm(this.id)
  }

  setupForm(id) {
    forkJoin(
      this.api.getAll('Option'),
      this.api.getAll('Category')
    ).subscribe( ([options,categories] ) => {
      this.optionList = options.map(c => c.name);
      this.categoryList = categories.map(c => c.name);
    });

    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      this.api.get('Component',id).subscribe(
        component => { 
          this.componentCreateForm.patchValue(component);
          this.selectedOptions = component.options;
          this.selectedCategories = component.categories;
        });
    }
  }

  createForm(){
    let def = {
      name:'',
      type: '',
      description:'',
      categories: [],
      options: []
    }

    this.componentCreateForm = this.fb.group(def);
    this.componentCreateForm.setValue(def);
  }


  add(event: MatChipInputEvent, ctrl, type): void { 
    let autoComplete
    switch(type){
      case 'option':
        autoComplete = this.autoOption;
        break;
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

  selected(event: MatAutocompleteSelectedEvent, selectedItems, inputType, ctrl, field): void {

    if ( this[selectedItems].indexOf(event.option.viewValue) < 0 ){
      this[selectedItems].push(event.option.viewValue);
    }

    this.componentCreateForm.setValue(Object.assign(this.componentCreateForm.value, {[field]: this[selectedItems]}));
    this[inputType].nativeElement.value = '';
    this[ctrl].setValue(null);
  }

  private _filter(value: string, type): string[] {
    const filterValue = value.toLowerCase();
    return this[type].filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.post('Component', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/components/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.update('Component', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/components/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}

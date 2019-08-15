import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PriceFormatterService } from 'src/app/shared/price-formatter.service';

@Component({
  selector: 'app-modifier-create',
  templateUrl: './modifier-create.component.html',
  styleUrls: ['./modifier-create.component.css']
})
export class ModifierCreateComponent implements OnInit {

  visible     = true;
  selectable  = true;
  removable   = true;
  addOnBlur   = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  categoryCtrl  = new FormControl();

  filteredCategories: Observable<string[]>;

  selectedCategories: any[] = [];

  categoryList = [];
  componentsList = [];
  
  modifierCreateForm: FormGroup;
  pageType = 'Create';
  id = this.route.snapshot.params['id'];

  @ViewChild('categoryInput', { static: true })  categoryInput:  ElementRef<HTMLInputElement>;

  @ViewChild('autoCategory', { static: true })  autoCategory:  MatAutocomplete;

  constructor(
    private priceFormatter: PriceFormatterService,
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

  setupForm(id){

    forkJoin(
      this.api.getAll('Category'),
      this.api.getAll('Component')
    ).subscribe(
      ([categories,components]) => {
         this.categoryList = categories.map(cat => cat.name)
         this.componentsList = components.map(comp => comp.name)
      }
    );

    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      this.getModifierDetails(id);
    }
  }

  getModifierDetails(id) {
    this.api.get('Modifier',id)
      .subscribe(modifier => {
        console.log('modifier', modifier)
        
        Object.assign(modifier, {fee: this.priceFormatter.formatPriceToBills(modifier['fee'])})

        this.modifierCreateForm.patchValue(modifier);
        this.selectedCategories = modifier.categories;
      });
  }

  createForm(){
    let def = {
      name: '',
      description: '',
      additions:[],
      removals:[],
      categories:[],
      fee: 0
    };

    this.modifierCreateForm = this.fb.group(def);
    this.modifierCreateForm.setValue(def);
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

  selected(event: MatAutocompleteSelectedEvent, selectedItems, inputType, ctrl, field): void {
    if ( this[selectedItems].indexOf(event.option.viewValue) < 0 ){
      this[selectedItems].push(event.option.viewValue);
    }

    this.modifierCreateForm.setValue(Object.assign(this.modifierCreateForm.value, {[field]: this[selectedItems]}));
    this[inputType].nativeElement.value = '';
    this[ctrl].setValue(null);
  }

  private _filter(value: string, type): string[] {
    const filterValue = value.toLowerCase();
    return this[type].filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  onFormSubmit(form: NgForm) {
    form = Object.assign(form, {
      name: form.name.trim().toLowerCase(),
      fee: this.priceFormatter.formatPriceToCents(form['fee'])
    });

    if (this.pageType === 'Create') {
      console.log('Creating', form)
      this.api.post('Modifier', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/modifiers/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      this.api.update('Modifier', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/modifiers/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}

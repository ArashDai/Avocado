import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../api.service';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import {  MatChipsModule, MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DialogQuestionService } from '../../shared/dialog/dialog-question.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
  providers:[DialogQuestionService]
})

export class ItemCreateComponent implements OnInit {

  visible     = true;
  selectable  = true;
  removable   = true;
  addOnBlur   = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  itemCreateForm: FormGroup;
  
  modifierCtrl  = new FormControl();
  optionCtrl    = new FormControl();
  categoryCtrl  = new FormControl();
  taxCtrl       = new FormControl();
  componentCtrl = new FormControl();
  
  filteredModifiers:  Observable<string[]>;
  filteredOptions:    Observable<string[]>;
  filteredCategories: Observable<string[]>;
  filteredTaxes:      Observable<string[]>;
  filteredComponents: Observable<string[]>;

  categoryList:  any[] = [];
  optionList:    any[] = [];       //string[] = ['White Bread', 'Wheat Bread', 'Extra Mayo', 'Mustard', 'Grilled Onions', 'Toasted'];
  modifierList:  any[] = [];       //string[] = ['Add Bacon', 'Add Avocado', 'Double Meat', 'Double Cheese'];
  taxList:       any[] = [];       //string[] = ['Defaut Tax', 'Dine-in Tax', 'Hot Food Tax'];
  componentList: any[] = [];       //string[] = ['White Bread', 'Wheat Bread', 'Mayo', 'Turkey', 'Ham', 'Lettuce', 'Tomato', 'Onions'];
  typeList:      any[] = [];

  selectedModifiers:  any[] = [];
  selectedOptions:    any[] = [];
  selectedCategories: any[] = [];
  selectedTaxes:      any[] = [];
  selectedComponents: any[] = [];

  pageType = 'Create';
  id = this.route.snapshot.params['id'];
  formData:any;

  @ViewChild('modifierInput')  modifierInput:  ElementRef<HTMLInputElement>;
  @ViewChild('optionInput')    optionInput:    ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput')  categoryInput:  ElementRef<HTMLInputElement>;
  @ViewChild('taxInput')       taxInput:       ElementRef<HTMLInputElement>;
  @ViewChild('componentInput') componentInput: ElementRef<HTMLInputElement>;

  @ViewChild('autoModifier')  autoModifier:  MatAutocomplete;
  @ViewChild('autoOption')    autoOption:    MatAutocomplete;
  @ViewChild('autoCategory')  autoCategory:  MatAutocomplete;
  @ViewChild('autoTax')       autoTax:       MatAutocomplete;
  @ViewChild('autoComponent') autoComponent: MatAutocomplete;

  constructor(
    public service: DialogQuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ){

    this.filteredModifiers = this.modifierCtrl.valueChanges.pipe( 
      startWith(null),
      map((modifier: string | null) => modifier ? this._filter(modifier, 'modifierList') : this.modifierList.slice() )
    );

    this.filteredOptions = this.optionCtrl.valueChanges.pipe( 
      startWith(null),
      map((option: string | null) => option ? this._filter(option, 'optionList') : this.optionList.slice() )
    );

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe( 
      startWith(null),
      map((category: string | null) => category ? this._filter(category, 'categoryList') : this.categoryList.slice() )
    );

    this.filteredTaxes = this.taxCtrl.valueChanges.pipe( 
      startWith(null),
      map((tax: string | null) => tax ? this._filter(tax, 'taxList') : this.taxList.slice() )
    );

    this.filteredComponents = this.componentCtrl.valueChanges.pipe( 
      startWith(null),
      map((component: string | null) => component ? this._filter(component, 'componentList') : this.componentList.slice() )
    );

    this.createForm();
  }

  ngOnInit(){
    this.setupForm(this.id);
  }

  createForm(){
    this.itemCreateForm = this.fb.group({
      name: '',
      categories: [],
      price: 0, 
      options: [],
      components: [], 
      modifiers: [],
      removals: [], 
      taxes: [],
      description: '', 
      author: '', 
    });
  }

  setupForm(id) {
    forkJoin(
      this.api.getAll('Category'),
      this.api.getAll('Modifier'),
      this.api.getAll('Option'),
      this.api.getAll('Tax'),
      this.api.getAll('Component'),
      this.api.getAll('Type')
      ).subscribe(([Categories, Modifiers, Options, Taxes, Components, Types]) => { 
        this.categoryList = Categories.map(c => c.name);
        this.modifierList = Modifiers.map(c => c.name);
        this.optionList = Options.map(c => c.name);
        this.taxList = Taxes.map(c => c.name );
        this.componentList = Components.map(c => c.name);
        this.typeList = Types.map(c => c.name ); 
    });

    if(this.route.snapshot.data.update){
      this.api.get('Item',id).subscribe( item => {
        this.itemCreateForm.patchValue(item)

        this.selectedModifiers = item.modifiers;
        this.selectedOptions = item.options;
        this.selectedCategories = item.categories;
        this.selectedTaxes = item.taxes;
        this.selectedComponents = item.components;

        console.log(item, this.itemCreateForm)
      
      });
      
      this.pageType = 'Update';
    }
  }

  add(event: MatChipInputEvent, ctrl, type): void { 
    let autoComplete
    switch(type){
      case 'modifier':
        autoComplete = this.autoModifier;
        break;
      case 'option':
        autoComplete = this.autoOption;
        break;
      case 'category':
        autoComplete = this.autoCategory;
        break;
      case 'tax':
        autoComplete = this.autoTax;
        break;
      case 'component':
        autoComplete = this.autoComponent;
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

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      this.api.post('Item', form)
        .subscribe(res => {
          console.log('resres',res)
          let id = res['_id'];
          this.router.navigate(['menu/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      this.api.update('Item', this.id, form)
        .subscribe(res => {
          console.log('resres',res)
          let id = res['_id'];
          this.router.navigate(['menu/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}
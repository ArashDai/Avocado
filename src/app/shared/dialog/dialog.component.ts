import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { TemplateRef, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'

export interface DialogData {
  dialogType: string;
  dialog:any;
  item: any;
  questions:any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef }) vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('all the stuff', this.data)
    // make a dialog-checkout-component, combine-tickets, customer-loyalty, split-ticket, discounts, custom-item
    // based on data.dialogType (currently only from menu-selection) and then item.dialogFormType (simple or complex) )

    // 1 pick the  component with componentSelector
    // 2 apply attributes for the dialog type with applyAttributes
    // 3 show dialog
  }


  ngOnInit() {
    const component = this.componentSelector(this.data.dialogType);
    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.vcRef.createComponent(factory);

    this.applyAttributes(this.data.dialogType, this.componentRef);
  }

  componentSelector(type) {
    console.log('Dynamic',DynamicFormComponent)
    switch(type){
      case 'menu-selection': return DynamicFormComponent
      // case 'checkout': return DynamicFormComponent next i need to make the checkout component
    }
  }

  applyAttributes(type, component){
    switch(type){
      case 'menu-selection': 
        //is there a cleaner way to do this?
        component.instance.item = this.data.item;
        component.instance.questions = this.data.questions;
        component.instance.name = this.data.item.name;
        component.instance.dialog = this.dialogRef;
        component.instance.dialogType = this.data.dialogType;
      // case 'checkout': return DynamicFormComponent next i need to make the checkout component
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() { 
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
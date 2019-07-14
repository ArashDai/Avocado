import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../../api.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DialogQuestionService } from '../../../shared/dialog/dialog-question.service';


@Component({
  selector: 'app-menu-item-selector',
  templateUrl: './menu-item-selector.component.html',
  styleUrls: ['./menu-item-selector.component.css']
})

export class MenuItemSelectorComponent implements OnInit {

  categories:any;
  items:any;
  selectedItems:any;

  constructor(  
    public service: DialogQuestionService,
    private api: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //change this later
    //on init grab all of the categories
    this.api.getAll('Category')
      .subscribe( res =>{
        console.log(res);
        this.categories = res;
      },err => {
        console.log(err);
      })
    
    this.api.getAll('Item')
      .subscribe( res => {
        console.log(res);
        this.items = res;
      }, err => {
        console.log(err);
      })
    
  }

  categorySelect(category){
    //query all items with that category
    this.selectedItems = [];

    this.items.forEach((item)=>{
      if(item.categories && item.categories.includes(category.name)){
        this.selectedItems.push(item);
      }
    })
  }

  addItem(item){
    //const options = []; //maybe change this to an array then fetch stuff in the dialog itself since menu-item-selector wont have these lists
    let dialogQuestions;
      // add an item to the sibling component Ticket
      // first open a modal and create a specific instance of the item
      // in the modal as questions for item specifications
      // e.g. type of bread, sauce, meat, extra bacon
      // calculate final price and add the item instance to the ticket

      // input will be either simple or complex
      // a simple item like a danish only needs quantity
      // a complex item like a sandwich needs the modifiers options removals and additions of the item being added not all of them
      if(  //clean this up
          (item.modifiers && item.modifiers.length > 0) ||
          (item.options && item.options.length > 0) ||
          (item.additions && item.additions.length > 0) ||
          (item.removals && item.removals.length > 0) 
      ) {
        console.log('its complex');
        item.dialogFormType = 'complex';
        dialogQuestions = this.service.getQuestions('complex', item); 
      } else {
        console.log('its simple');
        item.dialogFormType = 'simple';
        dialogQuestions = this.service.getQuestions('simple', item);
      }
      console.log('item before dialog',item)
    this.openDialog(item, dialogQuestions)
  }

  openDialog(item, questions): void {
    //i need to grab the questions in addItem above and pass them into the dialog
    console.log('opening dialog', item)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '45%',
      data: {
        item,
        dialogType:'menu-selection',
        dialog:this,
        questions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

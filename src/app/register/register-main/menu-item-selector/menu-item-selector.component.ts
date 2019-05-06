import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../../api.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';



@Component({
  selector: 'app-menu-item-selector',
  templateUrl: './menu-item-selector.component.html',
  styleUrls: ['./menu-item-selector.component.css']
})

export class MenuItemSelectorComponent implements OnInit {

  categories:any;
  items:any;
  selectedItems:any;
  constructor(private api: ApiService, public dialog: MatDialog) { }

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
    // add and item to the sibling component Ticket
    // first open a modal and create a specific instance of the item
    // in the modal as questions for item specifications
    // e.g. type of bread, sauce, meat, extra bacon
    // calculate final price and add the item instance to the ticket
    this.openDialog(item)
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      data: {Quantity:item.quantity, ItemName: item.name, ItemDetails: item.details}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

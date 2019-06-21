import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



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

  dialogType = this.data.dialogType;
  questions = this.data.questions;
  name = this.data.item.name;
  dialog = this.dialogRef;
  item = this.data.item;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('all the stuff', this.data)
    //so based on data.dialogType (currently only from menu-selection) and then item.dialogFormType (simple or complex)
  }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



export interface DialogData {
  type: string;
  details: any;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {

  type = this.data.type;
  questions = this.data.details.questions;
  name = this.data.details.name;
  dialog = this.dialogRef;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  
  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
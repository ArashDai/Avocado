import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-modifier-manager',
  templateUrl: './modifier-manager.component.html',
  styleUrls: ['./modifier-manager.component.css']
})

export class ModifierManagerComponent implements OnInit {

  displayedColumns = ['name','description','categories','fee','additions','removals'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe
    ) { }

  ngOnInit() {
    
    this.api.getAll('Modifier')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }
}

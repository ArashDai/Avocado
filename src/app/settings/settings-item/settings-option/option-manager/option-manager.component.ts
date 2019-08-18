import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-option-manager',
  templateUrl: './option-manager.component.html',
  styleUrls: ['./option-manager.component.css']
})

export class OptionManagerComponent implements OnInit {

  displayedColumns = ['name', 'type', 'fee'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe
  ) { }

  ngOnInit() {
    this.api.getAll('Option')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }
}
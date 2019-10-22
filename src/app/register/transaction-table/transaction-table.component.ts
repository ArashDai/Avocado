import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})

export class TransactionTableComponent implements OnInit {

  displayedColumns: string[] = ['dateTime', 'status', 'balanceDue', 'cashier', 'customer', 'totals'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private api: ApiService,
    private cp: CurrencyPipe
  ) { }

  ngOnInit() {
    this.api.getAll('transaction')
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });
  }

}
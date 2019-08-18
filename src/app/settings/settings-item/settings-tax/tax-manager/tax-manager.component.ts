import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tax-manager',
  templateUrl: './tax-manager.component.html',
  styleUrls: ['./tax-manager.component.css']
})
export class TaxManagerComponent implements OnInit {

  displayedColumns = ['name', 'rate', 'description'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Tax')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}
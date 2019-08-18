import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-type-manager',
  templateUrl: './type-manager.component.html',
  styleUrls: ['./type-manager.component.css']
})
export class TypeManagerComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Type')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}
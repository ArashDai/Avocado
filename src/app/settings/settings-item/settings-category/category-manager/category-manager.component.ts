import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})

export class CategoryManagerComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Category')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }
}  
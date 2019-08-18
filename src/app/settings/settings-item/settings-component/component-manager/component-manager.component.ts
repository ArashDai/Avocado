import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.css']
})
export class ComponentManagerComponent implements OnInit {

    components:any;
    displayedColumns = ['name','type', 'categories', 'options'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort, {static: true}) sort: MatSort;
  
    constructor(private api: ApiService) { }
  
    ngOnInit() {
      this.api.getAll('Component')
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
      });
    }
  
  }

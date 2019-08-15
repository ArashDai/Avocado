import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import { Observable } from 'rxjs';
import { CdkTableModule} from '@angular/cdk/table';//probably dont need this


@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.css']
})

export class MenuManagerComponent implements OnInit {

  items:any;
  displayedColumns = ['name', 'price', 'taxes', 'categories', 'modifiers', 'components', 'options', 'description'];
  dataSource = new ItemDataSource(this.api);

  constructor(private api: ApiService) { }
  

  
  ngOnInit() {
    this.api.getAll('Item')
      .subscribe(res => {
        console.log(res);
        this.items = res;
      }, err => {
        console.log(err);
      });
  }
  
}

export class ItemDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getAll('Item');
  }

  disconnect() {

  }
}

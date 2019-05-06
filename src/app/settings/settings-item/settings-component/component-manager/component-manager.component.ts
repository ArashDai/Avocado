import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-component-manager',
  templateUrl: './component-manager.component.html',
  styleUrls: ['./component-manager.component.css']
})
export class ComponentManagerComponent implements OnInit {

    components:any;
    displayedColumns = ['name','type', 'categories', 'options'];
    dataSource = new OptionDataSource(this.api);
  
    constructor(private api: ApiService) { }
  
    ngOnInit() {
      this.api.getAll('Component')
      .subscribe(res => {
        console.log(res);
        this.components = res;
      }, err => {
        console.log(err);
      });
    }
  
  }
  
  export class OptionDataSource extends DataSource<any> {
    constructor(private api: ApiService) {
      super()
    }
  
    connect() {
      return this.api.getAll('Component');
    }
  
    disconnect() {
  
    }
  }
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-type-manager',
  templateUrl: './type-manager.component.html',
  styleUrls: ['./type-manager.component.css']
})
export class TypeManagerComponent implements OnInit {

  types:any;
  displayedColumns = ['name', 'description'];
  dataSource = new TypeDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Type')
    .subscribe(res => {
      console.log(res);
      this.types = res;
    }, err => {
      console.log(err);
    });
  }

}

export class TypeDataSource extends DataSource<any> {
    constructor(private api: ApiService) {
      super()
    }
  
    connect() {
      console.log('hello Type')
      return this.api.getAll('Type');
    }
  
    disconnect() {
  
    }
}


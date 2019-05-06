import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  categories:any;
  displayedColumns = ['name', 'description'];
  dataSource = new CategoryDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Category')
    .subscribe(res => {
      console.log(res);
      this.categories = res;
    }, err => {
      console.log(err);
    });
  }
}  

export class CategoryDataSource extends DataSource<any> {
    constructor(private api: ApiService) {
      super()
    }
  
    connect() {
      console.log('hello Category')
      return this.api.getAll('Category');
    }
  
    disconnect() {
  
    }
}

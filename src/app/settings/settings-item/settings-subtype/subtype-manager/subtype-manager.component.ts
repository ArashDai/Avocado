import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-subtype-manager',
  templateUrl: './subtype-manager.component.html',
  styleUrls: ['./subtype-manager.component.css']
})

export class SubtypeManagerComponent implements OnInit {

  subtypes:any;
  displayedColumns = ['name', 'description', 'parentType'];
  dataSource = new SubtypeDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Subtype')
    .subscribe(res => {
      console.log(res);
      this.subtypes = res;
    }, err => {
      console.log(err);
    });
  }

}

export class SubtypeDataSource extends DataSource<any> {
    constructor(private api: ApiService) {
      super()
    }
  
    connect() {
      console.log('hello subType')
      return this.api.getAll('Subtype');
    }
  
    disconnect() {
  
    }
}

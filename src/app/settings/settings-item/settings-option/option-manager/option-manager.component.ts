import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-option-manager',
  templateUrl: './option-manager.component.html',
  styleUrls: ['./option-manager.component.css']
})

export class OptionManagerComponent implements OnInit {

  options:any;
  displayedColumns = ['name', 'type', 'fee'];
  dataSource = new OptionDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Option')
    .subscribe(res => {
      console.log(res);
      this.options = res;
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
    console.log('hello Option')
    return this.api.getAll('Option');
  }

  disconnect() {

  }
}
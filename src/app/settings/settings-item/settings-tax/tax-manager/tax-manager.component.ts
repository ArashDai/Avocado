import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-tax-manager',
  templateUrl: './tax-manager.component.html',
  styleUrls: ['./tax-manager.component.css']
})
export class TaxManagerComponent implements OnInit {

  taxes:any;
  displayedColumns = ['name', 'rate', 'description'];
  dataSource = new TaxDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Tax')
    .subscribe(res => {
      console.log(res);
      this.taxes = res;
    }, err => {
      console.log(err);
    });
  }

}

export class TaxDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    console.log('hello Tax')
    return this.api.getAll('Tax');
  }

  disconnect() {

  }
}
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-modifier-manager',
  templateUrl: './modifier-manager.component.html',
  styleUrls: ['./modifier-manager.component.css']
})

export class ModifierManagerComponent implements OnInit {

  modifiers:any;
  displayedColumns = ['name','description','categories','fee','additions','removals'];
  dataSource = new ModifierDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    
    this.api.getAll('Modifier')
    .subscribe(res => {
      this.modifiers = res;
    }, err => {
      console.log(err);
    });
  }
}

export class ModifierDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getAll('Modifier');
  }

  disconnect() {

  }
}

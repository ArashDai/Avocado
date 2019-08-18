import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-subtype-manager',
  templateUrl: './subtype-manager.component.html',
  styleUrls: ['./subtype-manager.component.css']
})

export class SubtypeManagerComponent implements OnInit {

  displayedColumns = ['name', 'description', 'parentType'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('Subtype')
    .subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}

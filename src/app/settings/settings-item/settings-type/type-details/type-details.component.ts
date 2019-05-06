import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.css']
})

export class TypeDetailsComponent implements OnInit {
  
  type = {};
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTypeDetails(this.route.snapshot.params['id']);
  }

  getTypeDetails(id) {
    this.api.get('Type',id)
      .subscribe(data => {
        console.log(data);
        this.type = data;
      });
  }

  deleteType(id) {
    this.api.delete('Type',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/types']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

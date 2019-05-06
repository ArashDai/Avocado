import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-subtype-details',
  templateUrl: './subtype-details.component.html',
  styleUrls: ['./subtype-details.component.css']
})

export class SubtypeDetailsComponent implements OnInit {
  
  subtype = {};
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSubtypeDetails(this.route.snapshot.params['id']);
  }

  getSubtypeDetails(id) {
    this.api.get('Subtype',id)
      .subscribe(data => {
        console.log(data);
        this.subtype = data;
      });
  }

  deleteSubtype(id) { //should be moved into a service
    this.api.delete('Subtype',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/subtypes']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}


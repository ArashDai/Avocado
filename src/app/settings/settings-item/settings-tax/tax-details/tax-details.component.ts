import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.css']
})
export class TaxDetailsComponent implements OnInit {
  
  tax = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTaxDetails(this.route.snapshot.params['id']);
  }

  getTaxDetails(id) {
    this.api.get('Tax',id)
      .subscribe(data => {
        console.log(data);
        this.tax = data;
      });
  }

  deleteTax(id) {
    this.api.delete('Tax',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/taxes']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategoryDetails(this.route.snapshot.params['id']);
  }

  getCategoryDetails(id) {
    this.api.get('Category',id)
      .subscribe(data => {
        console.log(data);
        this.category = data;
      });
  }

  deleteCategory(id) {
    this.api.delete('Category',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/categories']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}

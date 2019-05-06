import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item = {};

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router:Router
  ) { }


  ngOnInit() {
    console.log('item details')
    this.getItemDetails(this.route.snapshot.params['id']);
  }

  getItemDetails(id) {
    this.api.get('Item',id)
      .subscribe(data => {
        console.log('inside item details',data);
        this.item = data;
      });
  }

  deleteItem(id) {
    this.api.delete('Item',id)
      .subscribe(res => {
          this.router.navigate(['/menu']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-option-details',
  templateUrl: './option-details.component.html',
  styleUrls: ['./option-details.component.css']
})
export class OptionDetailsComponent implements OnInit {
  
  option = {};
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOptionDetails(this.route.snapshot.params['id']);
  }

  getOptionDetails(id) {
    this.api.get('Option',id)
      .subscribe(data => {
        console.log(data);
        this.option = data;
      });
  }

  deleteOption(id) { //should be moved into a service
    this.api.delete('Option',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/options']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

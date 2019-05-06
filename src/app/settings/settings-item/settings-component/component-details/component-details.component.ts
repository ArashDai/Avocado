import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit {
  
  component = {};
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getComponentDetails(this.route.snapshot.params['id']);
  }

  getComponentDetails(id) { //this should be moved into a service
    this.api.get('Component',id)
      .subscribe(data => {
        console.log(data);
        this.component = data;
      });
  }

  deleteComponent(id) { //should be moved into a service
    this.api.delete('Component',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/components']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

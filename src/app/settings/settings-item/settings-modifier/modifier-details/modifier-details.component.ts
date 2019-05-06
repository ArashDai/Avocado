import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-modifier-details',
  templateUrl: './modifier-details.component.html',
  styleUrls: ['./modifier-details.component.css']
})
export class ModifierDetailsComponent implements OnInit {

  modifier = {};
  
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getModifierDetails(this.route.snapshot.params['id']);
    console.log(this.modifier)
  }

  getModifierDetails(id) { //should be moved into a service
    this.api.get('Modifier',id)
      .subscribe(data => {
        console.log(data);
        this.modifier = data;
      });
  }

  deleteOption(id) { //should be moved into a service
    this.api.delete('Modifier',id)
      .subscribe(res => {
          this.router.navigate(['/settings/item/modifiers']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

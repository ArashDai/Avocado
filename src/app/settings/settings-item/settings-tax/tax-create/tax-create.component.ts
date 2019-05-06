import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-tax-create',
  templateUrl: './tax-create.component.html',
  styleUrls: ['./tax-create.component.css']
})
export class TaxCreateComponent implements OnInit {
  tax = {};
  taxCreateForm: FormGroup;
  pageType = 'Create';
  id = this.route.snapshot.params['id'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
    ){
    this.createForm();
  }
  // I need to do something to handle TaxRate input converting to and from decimal and displaying as percent in form
  ngOnInit() {
      this.setupForm(this.id);
  }


  setupForm(id) {
    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      this.api.get('Tax',id)
        .subscribe(
          tax => this.taxCreateForm.patchValue(tax)
        );
    }
  }

  createForm(){
    this.taxCreateForm = this.fb.group({
      name: '',
      rate: 0,
      description: ''
    });
  }

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      this.api.post('Tax', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/taxes/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      this.api.update('Tax', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/taxes/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}


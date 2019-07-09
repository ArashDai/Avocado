import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css']
})
export class TypeCreateComponent implements OnInit {
  type = {};
  typeCreateForm: FormGroup;
  pageType = 'Create';
  id = this.route.snapshot.params['id'];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.setupForm(this.id);
  }

  setupForm(id) {
    
    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      this.api.get('Type',id).subscribe( 
        type => this.typeCreateForm.patchValue(type)
      );
    }
  }

  createForm(){
    this.typeCreateForm = this.fb.group({
      name: '',
      description: ''
    });
  }

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.post('Type', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/types/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.update('Type', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/types/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}


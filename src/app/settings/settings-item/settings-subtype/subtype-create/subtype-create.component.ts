import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-subtype-create',
  templateUrl: './subtype-create.component.html',
  styleUrls: ['./subtype-create.component.css']
})

export class SubtypeCreateComponent implements OnInit {
  subtypeCreateForm: FormGroup;
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
      this.api.get('Subtype',id).subscribe( 
        subtype => this.subtypeCreateForm.patchValue(subtype)
      );
    }
  }

  createForm(){
    this.subtypeCreateForm = this.fb.group({
      name: '',
      parentType:'',
      description: '',

    });
  }

  onFormSubmit(form: NgForm) {

    if (this.pageType === 'Create') {
      console.log('Creating', form)
      this.api.post('Subtype', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/subtypes/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      this.api.update('Subtype', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/subtypes/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}


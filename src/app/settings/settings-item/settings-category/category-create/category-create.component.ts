import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  category = {};
  categoryCreateForm: FormGroup;
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

  ngOnInit() {
    console.log('category create',this.route.snapshot.data)
    if(this.route.snapshot.data.update){
      this.pageType = 'Update';
      console.log('were updating')
      this.getCategoryDetails(this.id);
    }
  }

  getCategoryDetails(id) {
    this.api.get('Category',id)
      .subscribe(data => {
        console.log('muh datah', data)
        this.category = data;
        this.categoryCreateForm.patchValue(data);
      });
  }

  createForm(){
    this.categoryCreateForm = this.fb.group({
      name: '',
      description: ''
    });
  }

  onFormSubmit(form: NgForm) {
    if (this.pageType === 'Create') {
      console.log('Creating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.post('Category', form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/categories/details', id]);
        }, (err) => {
          console.log(err);
        });
    } else if (this.pageType === 'Update') {
      console.log('Updating', form)
      form = Object.assign(form, {name: form.name.trim().toLowerCase()});
      this.api.update('Category', this.id, form)
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['settings/item/categories/details', id]);
        }, (err) => {
          console.log(err);
        });
    }
  }

}

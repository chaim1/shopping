import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  AddCategoryForm: FormGroup;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.AddCategoryForm = new FormGroup({
      nameCategory: new FormControl (null,[Validators.required])
    })
  }
  onAddCategory(){
    console.log(this.AddCategoryForm);
    this.categoryService.addCategory(this.AddCategoryForm.value.nameCategory).subscribe(res=>{
      console.log(res);
    })
  }

}

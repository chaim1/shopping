import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Prouct } from 'src/app/models/prouct';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productadd-update',
  templateUrl: './productadd-update.component.html',
  styleUrls: ['./productadd-update.component.css']
})
export class ProductaddUpdateComponent implements OnInit {
  ProductForm: FormGroup;
  imagePreview;
  product: Prouct;
  ProductBootun;
  categorys;
  constructor(private productService: ProductService,private categoryService: CategoryService,private router: Router) {
    this.categoryService.getAllCategory().subscribe(res=>{
      this.categorys = res;
    })
  }

  ngOnInit() {
    this.ProductForm = new FormGroup({
      ProductName: new FormControl(this.product ? this.product.name : '', { validators: [Validators.required] }),
      image: new FormControl(this.product ? this.product.image : '', { validators: [Validators.required] }),
      price: new FormControl(this.product ? this.product.price : '', { validators: [Validators.required] }),
      Description: new FormControl(this.product ? this.product.Description : '', { validators: [Validators.required] }),
      categoryName: new FormControl(this.product ? this.product.category : '', { validators: [Validators.required] })
    });
    this.ProductBootun = this.product ? 'Update' : 'Add Product'
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.ProductForm.patchValue({ image: file });
    this.ProductForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  updateProduct(p: Prouct) {
    this.product = {
      name: p.name,
      image: p.image,
      id: p.id,
      Description: p.Description,
      price: p.price,
      category: p.category
    }
  }
  AddPruduct() {
    if (this.product) {

    } else {
      this.productService.addPost(this.ProductForm.value.ProductName, this.ProductForm.value.image, this.ProductForm.value.price, this.ProductForm.value.Description,this.ProductForm.value.categoryName)
      .subscribe(res=>{
        console.log(res);
      })
    }
  }
  navigateToAddCategory(){
    this.router.navigate(['add-category'])
  }
}

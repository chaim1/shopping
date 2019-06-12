import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
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
  products;
  ProductForm: FormGroup;
  imagePreview;
  product: Prouct;
  ProductBootun = false;
  categorys;
  idForUpdate;
  loader;
  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router, private fb: FormBuilder) {
    this.loader = true;
    this.categoryService.getAllCategory().subscribe(res => {
      this.categorys = res;
    })
    this.productService.getAllProducts().subscribe(res => {
      this.products = res.product;
      this.loader = false;
    })
  }

  ngOnInit() {
    this.ProductForm = new FormGroup({
      ProductName: new FormControl( '', { validators: [Validators.required] }),
      image: new FormControl( '', { validators: [Validators.required] }),
      price: new FormControl('', { validators: [Validators.required] }),
      Description: new FormControl('', { validators: [Validators.required] }),
      categoryName: new FormControl('', { validators: [Validators.required] })
    });
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
    this.imagePreview = p.image;
    this.ProductForm = this.fb.group({
      ProductName: p.name,
      image: p.image,
      price: p.price,
      Description: p.Description,
      categoryName: [p.category]
    });
    this.ProductBootun = true;
    this.idForUpdate = p._id;
  }
  saveUpdateProd() {
    this.loader = true;
    if(typeof this.ProductForm.value.image == "object"){
      this.productService.updateProdWithImg(this.idForUpdate,this.ProductForm.value.ProductName, this.ProductForm.value.image, this.ProductForm.value.price, this.ProductForm.value.Description, this.ProductForm.value.categoryName)
      .subscribe(res => {
        this.productService.getAllProducts().subscribe(res => {
          this.products = res.product;
          this.loader = false;
        })
      })
    }else{
    this.productService.updateProd({ prodId: this.idForUpdate, name: this.ProductForm.value.ProductName, image: this.ProductForm.value.image, price: this.ProductForm.value.price, Description: this.ProductForm.value.Description, category: this.ProductForm.value.categoryName }).subscribe(res => {
      this.productService.getAllProducts().subscribe(res => {
        this.products = res.product;
        this.loader = false;
      })
    })}
  }
  AddPruduct() {
    this.loader = true;
    this.productService.addPost(this.ProductForm.value.ProductName, this.ProductForm.value.image, this.ProductForm.value.price, this.ProductForm.value.Description, this.ProductForm.value.categoryName)
      .subscribe(res => {
        this.productService.getAllProducts().subscribe(res => {
          this.products = res.product;
          this.loader = false;
        })
      })
  }
  navigateToAddCategory() {
    this.router.navigate(['add-category'])
  }
}

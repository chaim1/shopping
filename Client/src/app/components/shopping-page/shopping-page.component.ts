import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  @ViewChild('f') prodData: NgForm;
  loader = false;
  categorys;
  products;
  NoProducts = false;
  cart;
  TotalPrice: number = 0;
  constructor(private categoryservice: CategoryService, private productService: ProductService,
    private activatedRoute: ActivatedRoute, private cartService : CartService, private router: Router ) {
    this.categoryservice.getAllCategory().subscribe(res => {
      this.categorys = res;
    })
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      this.loader = true;
    })
    this.activatedRoute.params.subscribe(paramsRes => {
      if (paramsRes.cartID) {
        const id = paramsRes.cartID;
        this.cartService.getCartByCartId(id).subscribe(res=>{
          this.cart = res;
          // console.log(res.cart.products);

          for(let i =0; i <  res.cart[0].products.length; i++ ){
            this.TotalPrice += (res.cart[0].products[i].sum * res.cart[0].products[i].price);
          }
        })
      }
    });
  }

  ngOnInit() {

  }
  getProdByCategory(nameCategory) {
    this.loader = false;
    this.products = '';
    this.NoProducts = false;
    this.productService.getProductByCategory(nameCategory).subscribe(res => {
      res.product.length !== 0 ? this.products = res: this.NoProducts = true;
      this.loader = true;
    })
  }
  addToCart(prod, sum) {
    if( !window.localStorage.getItem('userToken')){
      this.router.navigate(['home'])
    }
    this.loader = false;
    this.cartService.addProdToCart({prodImage: prod.image ,cartId: this.cart.cart[0]._id,prodId:prod._id, prodName: prod.name, prodPrice: prod.price, prodSm: sum}).subscribe(res=>{
      this.cartService.getCartByCartId(this.cart.cart[0]._id).subscribe(res=>{
        this.cart = res;
        this.loader =true;
        this.TotalPrice = 0;
        for(let i =0; i <  res.cart[0].products.length; i++ ){
          this.TotalPrice += (res.cart[0].products[i].sum * res.cart[0].products[i].price);
        }
      })
    })
  }
  GoToPay(cartId){
    if(this.TotalPrice==0){
      alert('by sumthing');
      return
    }
    this.router.navigate(['order/'+cartId]);
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  cartId;
  userId;
  cart;
  TotalPrice = 0;
  userCity;
  userStreet;
  numCradit = 0;
  loader;
  finish;
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService, private router: Router, private authUserService: AuthUserService, private orderService: OrderService) {
    this.loader = true;
    this.activatedRoute.params.subscribe(paramsRes => {
      if (paramsRes.cartID) {
        this.cartId = paramsRes.cartID;
        this.cartService.getCartByCartId(this.cartId).subscribe(res => {
          this.cart = res;
          for (let i = 0; i < res.cart[0].products.length; i++) {
            this.TotalPrice += (res.cart[0].products[i].sum * res.cart[0].products[i].price);
          }
          this.loader =  false;
        })
      }
    });
    this.userId = this.authUserService.getUserId()
  }

  ngOnInit() {
    this.orderForm = new FormGroup({
      userDate: new FormControl(null, [Validators.required]),
      userStreet: new FormControl(this.userStreet ? this.userStreet : null, [Validators.required]),
      userCity: new FormControl(this.userCity ? this.userCity : null, [Validators.required]),
      userCradit: new FormControl(null, [Validators.required])
    });
  }
  onOrder() {
    this.loader = true;
    let number = this.orderForm.value.userCradit.toString();
    this.orderService.createOrder({ idClient: this.userId, idCart: this.cartId, finalPrice: this.TotalPrice, city: this.orderForm.value.userCity, street: this.orderForm.value.userStreet, dateOrder: this.orderForm.value.userDate, craditCard: Number(number.substring((number.length - 4), number.length)) }).subscribe(res=>{
      console.log(res);
      this.cartService.addCartStatusOrder(this.cartId).subscribe(res=>{
        this.finish = true;
        this.loader = false;
      })
    })
  }

  backToShop() {
    this.router.navigate(['shopping/' + this.cartId]);
  }

}



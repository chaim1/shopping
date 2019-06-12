import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loader: boolean = true;
  loginForm: FormGroup;
  startShopping: boolean = false;
  userConected: boolean = false;
  errorMassage: boolean = false;
  noCart: boolean = true;
  token: string;
  newClient: boolean = true;
  lastOrder: boolean = false;
  cartId;
  lestDate;
  helpMasage;

  constructor(private router: Router, private loginService: LoginService, private authUserService: AuthUserService, private cartService: CartService, private orderService: OrderService) {
    this.getItem('userToken').then(res => {
      res ? this.getUserByToken(res) : this.loader = false;
    })
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }
  navigateToSignup() {
    this.router.navigate(['signup'])
  }
  onLogin() {
    this.errorMassage = false
    this.loader = true;
    this.loginService.loginUser(this.loginForm.value).subscribe(res => {
      this.loader = false;

      res.message == 'ok' ? this.userConected = true : this.errorMassage = true;
      if(res.token !== undefined){
        window.localStorage.setItem('userToken', res.token);
        if(res.role==3){
          this.authUserService.setRule(res.role);
          this.authUserService.userName.push(String(res.name));
          this.router.navigate(['admin-product']);
        }else{
          this.router.navigate(['home']);
          setTimeout(() => {
            this.router.navigate(['/']);
            this.authUserService.checkLoged();
          }, 1)}
        }
      })
    }
    getItem(key) {
      return Promise.resolve().then(() => {
        return localStorage.getItem(key);
      });
    }
    getUserByToken(token: string) {
      this.loginService.userInToken(token).subscribe(res => {

        if (res.message == "good") {
          this.helpMasage = true;
          this.authUserService.setRule(res.role);
          if(res.role == 3){
            this.authUserService.userName.push(String(res.name));
            this.router.navigate(['admin-product']);
            this.authUserService.setUserId(res.useId);
          }else{
            this.createCart(res);
            this.authUserService.setUserId(res.useId);
        this.authUserService.userName.push(String(res.name));
        this.token = window.localStorage.getItem('userToken');}
      } else {
        this.loader = false;
      }
    })
  }
  goStartShopping() {
    this.loader = true;
    this.cartService.createCart(this.authUserService.getUserId()).subscribe(res => {
      this.router.navigate(['shopping/'+res.result.idCart._id])
    })
  }
  goContinuShopping() {
    this.router.navigate(['shopping/'+this.cartId])
  }
  createCart(res) {
    this.cartService.getCartById(res.useId).subscribe(res => {
      res.cart.length !== 0 ? this.newClient = false : this.newClient = true;

      for (let i = 0; i < res.cart.length; i++) {
        if (res.cart[i].status == 2) {
          this.noCart = false;
          this.cartId = res.cart[i]._id;
        }
        if (res.cart[i].status == 3) {
          this.lastOrder = true;
        }
      }
      if (this.lastOrder && this.noCart) {
        this.lastOrderDataToUser(res)
      }
      this.loader = false;
    })
  }
  lastOrderDataToUser(res) {
    for(let i = 0; i < res.cart.length; i++){
      if(res.cart[i].status == 3){
        if(!this.lestDate){
          this.orderService.getOrderByCart(res.cart[i]._id).subscribe(res=>{
            this.lestDate  = res.order[0];
          })
          // this.lestDate = res.cart[i];
        }else if(res.cart[i].time> this.lestDate.time){
          this.orderService.getOrderByCart(res.cart[i]._id).subscribe(res=>{
            this.lestDate  = res.order[0];
          })
        }
      }
    }
  }

}


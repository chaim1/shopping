import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-enter-to-app',
  templateUrl: './enter-to-app.component.html',
  styleUrls: ['./enter-to-app.component.css']
})
export class EnterToAppComponent implements OnInit {
  numProducts:number;
  numCarts:number=0;

  constructor(private productService: ProductService, private cartService: CartService) {
    this.productService.getAllProducts().subscribe(res=>{
      this.numProducts = res.product.length;
    });
    this.cartService.getAllCarts().subscribe(res=>{
      for(let i = 0; i<res.cart.length;i++){
        if(res.cart[i].status == 3){
          this.numCarts++;
        }
      }
    })
   }
  ngOnInit() {
  }

}

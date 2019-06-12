import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-enter-to-app',
  templateUrl: './enter-to-app.component.html',
  styleUrls: ['./enter-to-app.component.css']
})
export class EnterToAppComponent implements OnInit {
  numProducts:number;
  numCarts:number=0;

  constructor(private productService: ProductService, private cartService: CartService, private orderService: OrderService) {
    this.productService.getAllProducts().subscribe(res=>{
      this.numProducts = res.product.length;
    });
    this.orderService.getAllOrders().subscribe(res=>{
      this.numCarts = res.orders.length
    })
   }
  ngOnInit() {
  }

}

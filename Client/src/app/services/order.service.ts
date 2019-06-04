import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(DateOrder){
    console.log(DateOrder);

    return this.httpClient.post(environment.uri+'Order/createOrder', DateOrder);
  }
  getOrderByCart(idCart):any{
    return this.httpClient.get(environment.uri+'Order/getOrderCart/'+idCart);
  }
}

// /getOrderId/:id

// /getOrderCart/:id

// /getOrderClient/:id



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  createCart(userId):any{
    return this.httpClient.post(environment.uri+'Cart/createCart',{userID: userId});
  }
  getCartById(userID):any{
    return this.httpClient.get(environment.uri+'Cart/getCart/'+userID);
  }
  getAllCarts():any{
    return this.httpClient.get(environment.uri+'Cart/getCart');
  }
  getCartByCartId(cartID):any{
    return this.httpClient.get(environment.uri+'Cart/getCartId/'+cartID);
  }
  addProdToCart(prodData){
    return this.httpClient.post(environment.uri+'Cart/addProd',prodData);
  }

}

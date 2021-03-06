import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }




  addPost(
    name: string,
    image: File,
    price,
    Description: string,
    category: string
  ) {
    const prodData = new FormData();
    prodData.append("name", name);
    prodData.append("image", image);
    prodData.append("price", price);
    prodData.append("Description", Description);
    prodData.append("category", category);

    return this.httpClient
      .post(environment.uri + "Prod/AddProd", prodData);
  }
  getAllProducts(): any {
    return this.httpClient.get(environment.uri + 'Prod/allProd');
  }
  getProductByCategory(nameCategory): any {
    return this.httpClient.get(environment.uri + 'Prod/ProdByCategory/' + nameCategory)
  }
  updateProd(prodData) {
    return this.httpClient.post(environment.uri + 'Prod/UpdateProd', prodData);
  }
  updateProdWithImg(
    idProd: string,
    name: string,
    image: File,
    price,
    Description: string,
    category: string) {
    const prodData = new FormData();
    prodData.append("idProd", idProd);
    prodData.append("name", name);
    prodData.append("image", image);
    prodData.append("price", price);
    prodData.append("Description", Description);
    prodData.append("category", category);

    return this.httpClient
    .post(environment.uri + 'Prod/UpdateProdWithImg', prodData);
  }
}

// this.idForUpdate,this.ProductForm.value.ProductName, this.ProductForm.value.image, this.ProductForm.value.price, this.ProductForm.value.Description, this.ProductForm.value.categoryName

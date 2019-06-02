import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  addCategory(nameCategory:string){

    return this.httpClient.post(environment.uri+'Category/addCategory',{nameCategory});
  }
  getAllCategory(){
    return this.httpClient.get(environment.uri+'Category/getCategory');
  }
}

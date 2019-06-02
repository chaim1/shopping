import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }
  findUserById(userId,email){
    return this.httpClient.get(environment.uri+'user/userId'+userId+'/email'+email)
  }
  userSignup(userData):any{
    return this.httpClient.post(environment.uri+'user/signup',userData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  loginUser(userData):any{
    return this.http.post(environment.uri+'user/login',userData);
  }
  userInToken(token:string):any{
    return this.http.post(environment.uri+'user/token',{token:token})
  }
}

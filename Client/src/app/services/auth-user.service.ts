import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService extends BehaviorSubject<any> {
  isLoged;
  userId:string;
  userName = [];
  constructor(private loginService: LoginService) {
    super('');
    this.userName.push(String(this.value));
    this.next(this.userName)
    this.checkLoged();
  }
  checkLoged(){
    this.loginService.userInToken(window.localStorage.getItem('userToken')).subscribe(res => {
      if (res.message == "good") {
        this.isLoged = true;
      } else {
        this.isLoged = false;
      }
    })
  }
  returnUserLoged(){
    return this.isLoged;
  }
  logOutUser(){
    this.isLoged = false;
    this.userName = [];
  }
  setUserId(userId){
    this.userId = userId;
  }
  getUserId(){
    return this.userId;
  }




}

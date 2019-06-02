import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitysIsraelService } from 'src/app/services/citys-israel.service';
import { SignupService } from 'src/app/services/signup.service';
import { UserSignup } from 'src/app/models/user-signup';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errotIdUsed: boolean = false;
  errorPwdUsed: boolean = false;
  passwordConfigValid: boolean = false;
  loader: boolean = false;
  stepTow: boolean = false;
  signupForm: FormGroup;
  signupFormStepTow: FormGroup;
  citys;
  constructor(private router: Router, private cityInIsrael: CitysIsraelService, private signupService: SignupService,private authUserService: AuthUserService) {
    this.citys = this.cityInIsrael.getCitys();
  }
  ngOnInit() {
    this.signupForm = new FormGroup({
      userID: new FormControl(null, [Validators.required]),
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userPwd1: new FormControl(null, [Validators.required]),
      userPwd2: new FormControl(null, [Validators.required])
    });
    this.signupFormStepTow = new FormGroup({
      userCity: new FormControl(null, [Validators.required]),
      userAddress: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required])
    })
  }
  onNextSignup() {
    this.resetAllHlpers()
    if (this.signupForm.value.userPwd1 !== this.signupForm.value.userPwd2) {
      this.passwordConfigValid = true;
      return;
    } else {
      this.loader = true;
      this.signupService.findUserById(this.signupForm.value.userID, this.signupForm.value.userEmail).subscribe((res) => {
        res == 'ok' ? this.stepTow = true : res == 'ID already used' ? this.errotIdUsed = true : this.errorPwdUsed = true;
        this.loader = false;
      })
    }
  }
  onFinalSignup() {
    this.loader = true;
    let userData = { ...this.signupForm.value, ...this.signupFormStepTow.value };
    this.signupService.userSignup(userData).subscribe(res => {
      console.log(res);
      window.localStorage.setItem('userToken', res.result.token);
      this.authUserService.userName.push(String(res.result.name));
      this.loader = false;
      this.authUserService.checkLoged();
      this.router.navigate(['/'])
    })
  }
  navigateToLogin() {
    this.router.navigate([''])
  }
  resetAllHlpers() {
    this.errotIdUsed = false;
    this.errorPwdUsed = false;
    this.passwordConfigValid = false;
  }
}

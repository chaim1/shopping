import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName;
  constructor(private authUserService: AuthUserService, private router: Router) {
  }
  conectClcik() {
    this.router.url == '/' ? this.router.navigate(['signup']) : this.router.navigate(['/'])
  }
  logoutUser() {

    window.localStorage.removeItem('userToken');
    this.authUserService.logOutUser();
    this.router.navigate(['home'])
    setTimeout(() => {
      this.router.navigate([''])
    }, 1)
    this.userName = false;
  }
  ngOnInit() {
    this.authUserService.subscribe(res => {
      this.userName = res;
    })
  }
}

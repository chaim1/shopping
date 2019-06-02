import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {
  loaged;
  constructor(private authUserService: AuthUserService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const logged = this.authUserService.returnUserLoged();
      if (!logged) {
        this.router.navigate(['']);
      }
      return logged;
  }
}

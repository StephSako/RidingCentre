import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthenticationService } from './Services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  private allowedRoles: number[] = [];

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      this.allowedRoles = route.data.roles;
      if (this.allowedRoles && !this.allowedRoles.includes(this.authService.getUserDetails().role_user_id)) {
        this.router.navigateByUrl('/home');
        return false;
      }
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

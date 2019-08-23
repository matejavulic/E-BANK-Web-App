/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Auth guard. If the route has refference to it
 * (in defined routes and components in app-routing.module.ts)
 * then first this module is called. It simply calls getIsAuth
 * method from auth service and decides whether to allow or
 * disallow access to reqeusted server resource.
 *
 */

import { CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise <boolean> {
    const isAuth = this.authService.getIsAuth(); //check if user is authenticated
    if (!isAuth) {
      this.router.navigate(['/login']); // if not, navigate user to login page
    }
    return isAuth;
  }
}

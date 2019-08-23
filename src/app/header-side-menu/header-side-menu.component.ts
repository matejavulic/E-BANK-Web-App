/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Component which controls behaviour
 * of header (loads user name and surname)
 * and controls behaviour of lwft side menu.
 *
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { DashService } from '../dashboard-component/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header-side-menu.component.html',
  styleUrls: ['./header-side-menu.component.css']
})
export class HeaderSideMenuComponent implements OnInit, OnDestroy { 
  isLoading = false;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  private userSub: Subscription; // subscriber to cath asynchronous response from dashboard.service.ts
  user = {
    name: "",
    surname: "",
  };

  /**
   * Here we inject two services:
   * 1. authService - to check if user is authenticated 
   * 2. dashService - If an user is authenticated, we load its full name from dashService
   * 
   */
  constructor(private authService: AuthService, public dashService: DashService) { }

  ngOnInit() {
    this.isLoading = true; 
    const userId = this.authService.getUserId();
    this.dashService.getUserData(userId);
    this.userSub = this.dashService.getUserDataListener()
      .subscribe((userData: { name: string, surname: string}) => {
        this.isLoading = false;
        this.user = userData; 
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe(); 
    this.userSub.unsubscribe(); 
  }

  
  onLogout() {
    this.authService.logout();
  }

}

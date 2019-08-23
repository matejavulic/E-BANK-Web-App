/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * Main app component.
 *
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { // ovako omogucujemo @ng da zna kojoj komponenti (klasi) pristupamo
  constructor(private authService: AuthService) { }
  ngOnInit() {
    /**
     * From this component we call function
     * autoAuthUser form authService component.
     * This function checks if the user is logged
     * in and sets timer for token. On timer's expiration
     * function loggs out user. If user reloads page
     * or even closes it (and the token is still active)
     * it aoutomaticly loggs in user. We call it from here
     * because we are 100% sure that this component will 
     * be first loaded when we start web app.  
     *  
     * */
  this.authService.autoAuthUser();
 }
}

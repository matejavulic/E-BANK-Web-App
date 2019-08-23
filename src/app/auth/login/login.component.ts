/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Component to control behaviour of
 * login form.
 * 
 */

import {Component} from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({ 
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']
})

export class LoginComponent { 
  isLoading = false;
  constructor(public authService: AuthService) {}
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}

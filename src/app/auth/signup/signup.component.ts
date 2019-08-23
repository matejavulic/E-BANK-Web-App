/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Signup component logic. Controlls behaviour
 * of signup form.
 *
 */
import {Component} from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({ 
  templateUrl: './signup.component.html', 
  styleUrls: ['./signup.component.css']
})

export class SignupComponent { 
  isLoading = false;
  constructor(public authService: AuthService) {} 
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.name, form.value.surname); // saljemo zahtev za slanje pod. za novog korisnika
  }
}

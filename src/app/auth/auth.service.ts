/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * Authentication service. Handles login, token storing
 * and user logout.
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any; // variable of TimeOut timer
  private userId: string;
  private authStatusListener = new Subject<boolean>(); // user authentication status listener

  constructor(private http: HttpClient, private router: Router) { }

  /*
  * Method which returns user's token. 
  * used in posts.service.ts
  * */
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable(); 
  }
  
  createUser(email: string, password: string, name: string, surname: string) {
    const signupData = { email: email, password: password, name: name, surname: surname };
    this.http.post('http://localhost:3000/api/user/signup', signupData)
      .subscribe(response => {
        this.router.navigate(['/login']);
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token; 
        this.token = token; 
        if (token) { 
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId; 
          this.isAuthenticated = true; 
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  /**
   * Method which tries to authenticate user
   * if there is unexpired token in local storage 
   * */
  autoAuthUser() {
    const authInformation = this.getAuthData(); 
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) { 
      this.token = authInformation.token; 
      this.userId = authInformation.creator; 
      this.isAuthenticated = true; 
      this.setAuthTimer(expiresIn / 1000); //ms
      this.authStatusListener.next(true);
    }
  }

  /**
   * Logout method. Before user is logged out
   * it first deletes token, then emits that
   * information through authStatusListener
   * and clears timeout timer
   */
  logout() {
    this.token = null; 
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    if (!this.token && !this.isAuthenticated) {
      this.clearAuthData(); 
      this.router.navigate(['/login']); 
    }
  }

  /**
   * Timer function to call logout method after 1h expires
   */
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => { 
      this.logout();
    }, duration * 1000);
  }

  /**
   * Private method used to store token in browsers local stroge.
   */
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token); 
    localStorage.setItem('expiration', expirationDate.toISOString()); 
    localStorage.setItem('creator', this.userId); 
  }
  /**
   * Method to clear local storage.
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('creator');
  }

  /**
   * Method which returns token,
   * token expiration date and users
   * bankAccountID from browser local storage.
   * */
  getAuthData() {
    const token = localStorage.getItem('token'); 
    const expirationDate = localStorage.getItem('expiration'); 
    const creator = localStorage.getItem('creator');
    if (!token && !expirationDate && !creator) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate), 
      creator: creator
    }
  }
}

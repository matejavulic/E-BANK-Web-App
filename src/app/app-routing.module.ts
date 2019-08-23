
/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * This module has defined routes and coresponding components to be called.
 * When some of these component is called in app.component.html new module
 * is rendered. In this way we use routes inside front-end part of web app.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // import module for routes handling
import { PostCreateComponent } from './posts/post-create/post-create.component'; // component for creating new utility payment
import { PostListComponent } from './posts/post-list/post-list.component'; // comp. for listing all of users utility payments
import { LoginComponent } from './auth/login/login.component'; 
import { SignupComponent } from './auth/signup/signup.component';
import { HelpComponent } from './help/help.component';
import { AuthGuard } from './auth/auth-guard'; // component to check if user is authenticated before accessing to other assets
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { TestComponent } from './test-component/test.component';
import { HeaderSideMenuComponent } from './header-side-menu/header-side-menu.component';

// we define components to be called upon activation of corresponding route
const routes: Routes = [

  { path: 'list', component: PostListComponent, canActivate: [AuthGuard] },
  
  /**
   * Guarded route, before its activation system checks if
   * the user is logged in via authGuard route guard.
   */
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  
  /**
   * Defining path as 'sth/:postId' we are defing dynamic part of URL from which data should be taken
   *  */ 
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] }, 
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent },
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }

];

/**
 * We define decorator. With this decorator
 * we are upgrading base class to be NgModule
 * by adding two more fields
 */ 
 
@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] //route guard to protect unathorized URL access to server resource
})
export class AppRoutingModule { }

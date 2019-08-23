/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * Module were all other modules are imported
 * and visible at the global app level
 *
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatTableModule,
  MatOptionModule,
  MatSelectModule,
  MatProgressBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderSideMenuComponent } from './header-side-menu/header-side-menu.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HelpComponent } from './help/help.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { TestComponent } from './test-component/test.component';

@NgModule({
  declarations: [ 
    AppComponent,
    PostCreateComponent,
    HeaderSideMenuComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    HelpComponent,
    DashboardComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatVideoModule,
    MatProgressBarModule,
  ],
 
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent] // allow component to be used in all component parts (for example in HTML) and not just in other modules
})
export class AppModule { }

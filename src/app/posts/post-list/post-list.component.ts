/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * Component for listing all of utility payments
 *
 */
import {Component, OnInit, OnDestroy, Injectable} from '@angular/core';
import { PageEvent } from '@angular/material';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
@Injectable()
export class PostListComponent implements OnInit, OnDestroy{
posts: Post[] = []; 
isLoading = false; // varible to set if we are fetching data (in a meantime front-end shows spinner)
totalPosts = 0; 
postsPerPage = 2; 
currentPage = 1; 
pageSizeOptions = [1, 2, 5, 10]; 
userIsAuthenticated = false;

private authStatusSub: Subscription;
private postSub: Subscription; // subscription object to listen when utility pymnts are updated

 constructor(public postsService: PostsService, public authService: AuthService) {}
 
 ngOnInit() {
  this.isLoading = true; // show loading spinner on frontend
  const userId = this.authService.getUserId(); //get logged in user id
  this.postsService.getPosts(this.postsPerPage, this.currentPage, userId); // get chunk of utility payments
  this.postSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => { //wait for data to be fetched
      this.isLoading = false; 
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
       });
       
  this.userIsAuthenticated = this.authService.getIsAuth(); //check if user is authenticated
  this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => { // listen to the repsponse and catch it when it is emitted
        this.userIsAuthenticated = isAuthenticated; 
      });
     
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) { 
    this.isLoading = true; 
    this.currentPage = pageData.pageIndex + 1; 
    this.postsPerPage = pageData.pageSize;
    const userId = this.authService.getUserId();
    this.postsService.getPosts(this.postsPerPage, this.currentPage, userId); 
  }
  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      const userId = this.authService.getUserId();
      this.postsService.getPosts(this.postsPerPage, this.currentPage, userId);
    });
  }
}

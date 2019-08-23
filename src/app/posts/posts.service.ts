/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * Service to support utility payment
 * creation, editing and deleting.
 * Also has a defined observable to
 * emit an change in fetched utility payments
 * to all subscribed compontents. 
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  // function to fetch utility payments from server in a chunks for a given userId
  getPosts(postsPerPage: number, currentPage: number, userId: string) {
    const queryParams = `?pagesize=${[postsPerPage]}&page=${currentPage}&creator=${userId}`;
    this.http
      .get<{ message: string, posts: any, maxPosts: number }>( 
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe
        (map((postData) => {
          return {
            posts: postData.posts.map(post => {
              return {
                id: post._id,
                title: post.title,
                content: post.content,
                imagePath: post.imagePath,
                creator: post.creator
              };
          }),
          maxPosts: postData.maxPosts
        };
      })
      )
      .subscribe(transformedPostsData => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostsData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
 getPost(id: string) {
     return this.http.get<{_id: string, title: string, content: string, imagePath: string}>('http://localhost:3000/api/posts/' + id);
  }
  addPost(title: string, content: string, image: File) {
    const postData = new FormData(); 
    postData.append('title', title); 
    postData.append('content', content);
    postData.append('image', image, title);
   this.http.post<{ message: string, post: Post}>('http://localhost:3000/api/posts/', postData)
    .subscribe(responseData => {
        this.router.navigate(['/list']); // upon successful payment editing navigate user to list of all payments
      });
  }
  // method for updating utility payment
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
      id: id,
      title: title,
      content: content,
      imagePath: image
    };
  }
     this.http
      .put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/list']);
      });
  }

deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
     }
}

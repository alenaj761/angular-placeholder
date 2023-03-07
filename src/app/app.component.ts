import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  tab = 0
  posts: Array<any> = [];
  photos: Array<any> = [];
  users: Array<any> = [];
  search = false;
  result: any = {};

  title : string = "";
  body : string = "";
  userId : number = 0;

  ngOnInit() {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(response => response.json())
    .then(data => {
      data.forEach((post: any) => {
        this.posts.push(post);
      });
    });
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(response => response.json())
    .then(data => {
      data.forEach((photo: any) => {
        this.photos.push(photo);
      });
    });
    fetch('https://jsonplaceholder.typicode.com/users?_limit=10')
    .then(response => response.json())
    .then(data => {
      data.forEach((user: any) => {
        this.users.push(user);
      });
    });
  }

  onPostClicked(i: number) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.posts[i].id}/`)
    .then(response => response.json())
    .then(data => {
      this.result = data;
    });
    this.search = true;
  }

  onTitleChanged(post: any) {
    let title = prompt("Insert a new title")
    if (title!=null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/`, {
        method: "PATCH"
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data) {
          let index = this.posts.findIndex((p) => p.id == post.id);
          if (index!=-1) {
            this.posts[index].title = title;
            this.result.title = title;
          }
        }      
      });
    }
  }

  onPostUpdated(post: any) {
    let title = prompt("Insert a new title")
    let body = prompt("Insert a new body")
    let userId = prompt("Insert a new user id")
    if (title!=null && body!=null && userId !=null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/`, {
        method: "PUT"
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        
        if (data) {
          let index = this.posts.findIndex((p) => p.id == post.id);
          if (index!=-1) {
            this.posts[index].title = title;
            this.posts[index].body = body;
            this.posts[index].userId = userId;
            this.result.title = title;
            this.result.body = body;
            this.result.userId = userId;
          }
        }      
      });
    }
  }

  onPostDelete(i: number) {
    if (confirm("Are you sure?")) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.posts[i].id}/`, {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.posts.splice(i, 1);
        }      
      });
    }
  }

  onPostSaved() {
    fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "POST"
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data) {
        this.posts.push({
          "id": data.id,
          "title": this.title,
          "body": this.body,
          "userId": this.userId,
        })
      }      
    });
  }
}

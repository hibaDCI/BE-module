# Scial Media App

## Project Description:

This project is an Express app that uses Mongoose to define and manage the data models for `users`, `posts`, and `comments`. The app contains the following schema:

### Schemas

- `users`, with fields `(name, email)`
- `posts`, with fields `(title, content, created_at, author)`
- `comments`, with fields `(content, created_at, author, post)`
  
###  Relationships between entities:

- One-to-many relationship between users and posts
- One-to-many relationship between posts and comments
- One-to-many relationship between users and comments

###
The app provides the following endpoints to apply CRUD operations:

No   | Method | Path                        | Description
-----|--------|-----------------------------|-------------------------
1    | POST   | `/users`                    |       add a new user.
2    | GET    | `/users`                    |       get all users.
3    | GET    | `/users/:uid`               |  get the profile info.
Posts     
1    | POST    | `/posts/users/:uid`        |  add new post by a single user.
2    | GET    | `/posts/users/:uid`         |  get all posts created by a user.
3    | GET    | `/posts`                    |  get all posts.
Comments      
1    | POST    | `/comments/users/:uid/posts/:pid`|  add new comment on a post by a user.
2    | GET     | `/comments/users/:uid/posts/:pid`|  get comments placed by user on a post.
3    | GET     | `/comments/posts/:pid`           |  get comments of a single post.



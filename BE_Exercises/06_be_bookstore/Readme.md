# Book Store Exercise

Please build a simple "bookstore" application using Node.js, Express, and Mongoose. The bookstore application should allow users to create books and reviews, as well as view, update, and delete them.

---
# Part 5 - Exercise
### Role-based Access Control + Cookies

Task:
1. Create a middleware function to enforce role-based access control for adding reviews and books.

2. The middleware function should check the role of the user making the request and allow access to the corresponding routes based on user's role. 
   1. Users with 'user' role should be allowed to add reviews
   2. Users with 'admin role should be allowed to add books

3. In addition to RBAC middleware, use cookies for access_token and read the cookie while get request includes 'access_token cookie' for token verification.

<br>

# Part 4 - Exercise
## JsonWebToken
### Task:

1. After the user signs up or signs in, create a JSON Web Token (JWT) token that contains the user's ID and email address as payload.

2. Define a middleware function to protect the routes that require authentication by verifying the JWT token sent in the request header.

3. Test signup/signin routes for generating token and protectect routes for token verification. 
# Part 3 - Exercise

## Encryption using bcrypt
In this task, you will be adding a new User model to the existing bookstore app, along with validators and sanitizers for the model fields.

You will then define routes for user signup and signin, and use bcrypt to hash the user's password and bcrypt.compare to signin. 

Follow the steps below to complete the task:

#### 1. Create a new User model with the following fields:

- name (required)
- email (required and unique)
- password (required)
- createdAt (default: current date)

#### 2. Use validators and sanitizers to ensure that:

- The name field contains only letters and spaces
- The email field is a valid email address
- The password field is at least 6 characters long

#### 3. Define the following routes for user signup and signin:

- POST /signup  
  - This route should accept `name`, `email`, and `password` in the `request body`. 
  - It should create a new user with the provided information, `hash the password using bcrypt`, and store the user in the database. 
- POST /signin 
  - This route should accept `email` and `password` in the request body. It should verify the user's credentials, i.e., check if the email exists and the password is correct using `bcrypt.compare()`. 
  

#### 4. Test the routes using a tool like Postman or ThunderClient.
# Part 2 - Exercise

## Populate and Select:

1. Update the Book controller's `getAllBooks` method to populate the `author field` with the corresponding author document.
   
2. Update the Book controller's `getBookById` method to select only the `title`, `description`, `price`, `author` and `category` fields to be returned.

3. Create a new route to get all books with their corresponding `author's name`, `email` and `age` fields displayed in the response. Use the __populate__ and __select__ methods to achieve this.

<br>

## Advanced querying:

1. Update the Book controller's `getAllBooks` method to only ***return books with a price greater than 20***. Use the `gt()` method to achieve this.
   
2. Create a new route to ***get all books with a rating greater than or equal to 4***. Use the `where()` and `gte()` methods to filter by the rating field.
   
3. Update the Book controller's `getAllBooks` method to ***sort the results by price in ascending order***. Use the `sort()` method to achieve this.

4. Create a new route to ***get the top 5 most expensive books***. Use the `sort()` and `limit()` methods to achieve this.

5. Create a new route to ***get the next 5 most expensive books after skipping the first 5 most expensive books***. Use the `sort()`, `limit()` and `skip()` methods to achieve this.
---
<br>

Already done ✅
# Part 1 - Exercise
## Step 1: Set up the project
Create a new Node.js project by creating the boilerplate.( create directories and file for models,routers,controllers, server.js, connection to db ).


## Step 2: Define the Book and Review Models
1. Define a Mongoose schema for the `book model` in `models/book.js`. The schema should include the following fields:

- title (string)
- author (string)
- publishedDate (date)
- genre (string)
- description (string)
- price (number)


2. Define a Mongoose schema for the `review model` in `models/review.js`. The schema should include the following fields:

- username (string)
- text (string)
- date (date)
- book (book object reference)


3. Define a one-to-many relationship between the book and review models. In the review schema, add a book field that is a reference to the book model.

## Step 3: Define the Book and Review Endpoints
Define a GET endpoint in routes/books.js that retrieves all books from the database.

Define a POST endpoint in routes/books.js that creates a new book in the database.

Define a GET endpoint in routes/books.js that retrieves a single book with all reviews from the database by ID.

Define a PUT endpoint in routes/books.js that updates an existing book in the database.

Define a DELETE endpoint in routes/books.js that deletes a book from the database.

Define a GET endpoint in routes/reviews.js that retrieves all reviews from the database.

Define a POST endpoint in routes/reviews.js that creates a new review in the database.

Define a GET endpoint in routes/reviews.js that retrieves a single review from the database by ID.

Define a PUT endpoint in routes/reviews.js that updates an existing review in the database.

Define a DELETE endpoint in routes/reviews.js that deletes a review from the database.


Good luck! 🙂
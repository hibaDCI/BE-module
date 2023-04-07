# Book Store Exercise

Please build a simple "bookstore" application using Node.js, Express, and Mongoose. The bookstore application should allow users to create books and reviews, as well as view, update, and delete them.

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
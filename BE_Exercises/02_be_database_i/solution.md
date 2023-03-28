# Solution

## Task 1 : open shell
```shell
// to open mongodb shell
mongosh

//to open mysql shell
sudo mysql -u root -p
```

## Task 2 : create database
```js
// in mongodb shell
use library;
```

```sql
/* in mysql shell */
CREATE DATBASE library;
USE library;
```

## Task 3 : 
In mysql we need to create database using above command and then use it but in mongodb directly use the database without create command.

## Task 4 : Create Collections/Tables
   
```js
//in mongo shell
db.createCollection('users');
db.createCollection('authors');
db.createCollection('books');
db.createCollection('borrows');
```

```sql
/* users */
CREATE TABLE users( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255), 
    email VARCHAR(255), 
    phone VARCHAR(255) 
);

/* books */
CREATE TABLE books( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255), 
    author INT, 
    isbn VARCHAR(50), 
    publishyear YEAR,
    FOREIGN KEY (author) REFERENCES authors(id) 
);

CREATE TABLE authors( 
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255), 
    nationality ENUM('American', 'German', 'Italian', 'Iranian'), 
    birthyear YEAR 
);

CREATE TABLE borrows( 
    user_id INT, 
    book_id INT, 
    borrow_date DATE, 
    return_date DATE, 
    FOREIGN KEY (book_id) REFERENCES books(id), 
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

```

## Task 5 : Insert data

```js

//mongodb shell
db.users.insertOne(
    { 
        name: "John Smith", 
        email: "john.smith@gmail.com", 
        phone: "+1 123-456-7890" 
    }
)
db.authors.insertOne(
    { 
        name: "Stephen King", 
        nationality: "American", 
        birthyear: 1947 
    }
)
db.books.insertOne(
    { 
        title: "The Shining", 
        author: 1, 
        isbn: "978-0-385-12167-5", 
        year: 1977 
    }
)
db.users.insertOne(
    { 
        user_id: 1,
        book_id: 1,
        borrow_date: '2023-03-28',
        return_date: '2023-04-14' 
    }
)
```

```sql
/* mysql shell */
/* add user */
INSERT INTO 
    users (name, email, phone) 
    VALUES("John Smith", "john@mail.com", "+1 123-456-789");

/* add author */
INSERT INTO 
    authors (name, nationality, birthyear) 
    VALUES ("Stephen king", "American", 1947);

/* add book */
INSERT INTO 
    books (title, author, isbn, publishyear) 
    VALUES ("The Shining", 1, "978-0-234234", 1977);

/* add borrow */
INSERT INTO 
    borrows VALUES(1, 1, '2023-03-28', '2023-04-14');

```

## Task 6 : Retieve data
```js

//mongodb shell
db.users.find();
db.authors.find();
db.books.find();
db.borrows.find();

```

```sql
/* mysql shell */
SELECT * FROM users;
SELECT * FROM authors;
SELECT * FROM books;
SELECT * FROM borrows;

/* retrieve data and join tables */
SELECT users.name, books.title, borrow_date, return_date
    FROM users, books, borrows
    WHERE
    users.id = borrows.user_id  /* join table users and borrows*/
    AND
    books.id = borrows.book_id; /* join table books and borrows*/

```
# Database Basics I

## Exercise

Creating and accessing a library database with `users`, `books`, `authors`, and `borrows` tables/collections through the mongo and mySQL shells.

Instructions:

1. Open your terminal and start the `mongo shell` and the `mySQL shell`.
2. Create a new database named `"library"` using both mongo and mySQL shells.
3. Compare the syntax used to create the ***"library"*** database in both shells.
4. Create a following collections in the ***"library"*** database using the mongo shell, and mySQL shell.
   1. Users (name, email, phone)
   2. Books (title, author, isbn, publishyear)
   3. Authors (name, nationality, birthyear)
   4. Borrows (user_id, book_id, borrow_date, return_date)
   

5. Insert some new documents into each collection and table with the following information: 
   1. { name: "John Smith", email: "john.smith@gmail.com", phone: "+1 123-456-7890" }.
   2. { name: "Stephen King", nationality: "American", birthyear: 1947 }.
   3. { title: "The Shining", author: "Stephen King", isbn: "978-0-385-12167-5", year: 1977 }
   4. { user_id: <id of the John Smith record>, book_id: <id of the The Shining record>, borrow_date: <current date>, return_date: two-weeks-later }.
   
6.  Query on all the collections and tables to retrieve the inserted data using both shells.
7.  Finally, describe the main differences between creating and accessing databases in mongo and mySQL shells.

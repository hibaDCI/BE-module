# Exercise: Implementing Subdocuments and Seeding in a Record-Shop Application

You are tasked with building a record-shop application that allows users to browse, search for, and purchase music albums. The application should be built using Node.js and MongoDB, and should utilize subdocuments and seeding to efficiently manage data.

## Step 1: Setting up the Project
1. Create a new Node.js project and install the necessary dependencies (`express`, `mongoose`, etc.).
1. Set up a MongoDB database and connect it to your project using `mongoose`.

## Step 2: Defining the Schema
1. Define a schema for the Album model that includes the following fields:
    - title (string)
    - artist (string)
    - releaseDate (date)
    - price (number)
    - tracks (array of subdocuments)


2. Define a schema for the `Track subdocument` that includes the following fields:
    - title (string)
    - duration (number)


## Step 3: Implementing Routes and Controllers
1. Create a `router` and `controller` for handling album ***CRUD*** operations (create, read).
2. Implement a route and controller for adding tracks to an album.

## Step 4: Seeding the Database
1. Create a seed script that populates the database with sample albums and tracks.
2. Run the seed script to populate the database with sample data.

## Step 5: Testing the Application
1. Test the application by using the routes and controllers to perform CRUD operations on albums and tracks.
2. Verify that the __subdocuments are being saved and retrieved__ correctly.
3. Verify that the __seed data has been successfully added__ to the database.

## Bonus Step: Adding Search Functionality
1. Implement a route and controller for `searching for albums by title or artist.`
2. Test the search functionality to ensure that it returns the correct results.

Congratulations! You have successfully implemented subdocuments and seeding in your record-shop application.
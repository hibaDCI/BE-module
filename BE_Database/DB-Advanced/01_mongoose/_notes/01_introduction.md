# Database Advanced

## Introduction
- When working with databases, developers often face the ***challenge of dealing with the complexity of the database layer***. <u>Object-Relational Mapping (ORM)</u> and <u>Object Document Mapping (ODM)</u> are two techniques used to __abstract the database and provide a simpler way to interact with the data__.

### Object-Relational Mapping (ORM)
- ORM is a technique used to map the `data` in a relational database `to objects` in an object-oriented programming language. ORM tools provide a high-level API for developers to interact with the database without having to write SQL code directly.
- `Sequelize` is an example for ORM. 

### Object-Document Mapping (ODM)
- ODM is a technique used to map the `data` in a document-oriented database `to objects` in an object-oriented programming language. ODM tools provide a way to interact with the database as objects in code.
- `Mongoose` is an example for ODM.


## Abstracting the database

- ORM and ODM are two common approaches to __abstracting the database layer__. 
- They provide a way to represent data in the database as objects in code and provide a ***simpler interface for developers*** to work with the data.

<br>
<hr>


## Mongoose
- Mongoose is a popular `ODM` library for MongoDB in Node.js. 
- It provides a simple and powerful __way to interact with MongoDB__ databases. 
- Allowing developers to `define and manipulate data models` in their Node.js apps.
- Developers can define `schemas` that represent the structure of their data, including fields, types, and validation rules. 
- Mongoose also provides a rich set of `features for querying and updating data`, such as query builders, middleware, and support for data population.

<div style="margin-top:3rem;border-left: 5px double; padding: 1rem;">
Overall, Mongoose simplifies the process of working with MongoDB databases in Node.js, providing a clean and consistent API that can be used to build robust and scalable applications.
</div>

<br>

### Adding Mongoose
- __Installing mongoose__: You can install mongoose using npm by running `npm install mongoose`.  
- __Connecting to our database__: Use `mongoose.connect(<connection string>)` to connect to your MongoDB database.
- __Listening to errors__: with `mongoose.connection.on('error', <function>);` listen to errors that occur during the connection process.


### Schema design principles I
When working with mongoose, it's important to:

<div style="width: 70%; margin:auto; margin-bottom:2rem;color:orange;font-size:1.3rem;">Follow good schema design principles to ensure your data is well-structured and efficient to work with.</div>

Here are some `key principles` to keep in mind:  

1. __Planning collection schema__:  
    Use <u>class diagrams</u> to plan out your data schema before creating your mongoose schemas.
    <img src="./images/class_diagram.png" width="80%" style="margin:1rem;">

2. __MVC Concepts__:  
   In the MVC pattern, the Model is responsible for managing the data.

3. __Project organization IV__:  
   Keep your mongoose schema files in a separate models folder to keep your project organized.  

4. Describing collections:  
   Use `new mongoose.Schema({<field name>: <field type>});` to create a schema that describes the structure of your data.

<br>


### Model
- A mongoose Model is a class that represents a collection in your MongoDB database. 
- Here are some key things to know about mongoose Models:
  - __Exporting a model__:  
    Use `mongoose.model(<name>, <schema>);` to create a new model for a collection.

  - __Seed scripts__:  
    Seed scripts are scripts that add initial data to your database to provide a Proof Of Concept (POC) for your application.

  - __Using models in seed scripts__:  
    Use new `new <model name>({<data>})` to create a new instance of a model and `modelInstance.save()` to save it to the database.

  - __Saving documents to database__:  
  Use `modelInstance.save()` to save a new document to the database.


<br>
<hr>

### Mocking data  

- Mocking data is the process of `generating fake data` to use in your application <u>during development or testing</u>. Here are some key points to keep in mind when mocking data with mongoose:

  - __Generating fake data using faker__:  
  `faker` is a Node.js library that provides a way to generate fake data. You can use it to generate fake names, addresses, phone numbers, etc.

  - __Creating multiple documents at once__:  
  Use await `<model name>.create(<document array>)` to create multiple documents at once.

  - __Purging collections__:  
  Use await `<model name>.deleteMany({})` to delete all documents from a collection.


Here are some useful resources for working with faker:  
[Faker API docs](https://fakerjs.dev/guide/usage.html)



# Mongoose Part II

<br>

## Recap on Contents of Last Session

  - ***Mongoose Introduction***
    1. Popular ODM library
    2. MongoDB offers powerful database interaction.
    3. Define and manipulate data models in Node.js .
    4. Defining schemas for data structure validation.
    5. Offers advanced querying and updating functions.
  
  
  - ***Connect to DB***
    1. Installing mongoose:  
    `npm install mongoose`
    2. Connecting to our database:  
    `mongoose.connect(<connection string>)` 
    3. Listening to errors: with mongoose.  `connection.on('error', <function>);`


  - ***Schema***
    1. Defines the structure and validation rules for MongoDB documents.
    2. A schema includes fields with types, validation rules, default values, and indexing options.
    3. Schema can create/query docs via Mongoose API.



  - ***Model***
    1.  To construct it use `mongoose.model(<name>, SchemaName)`
    2.  It provides an interface for CRUD operations.
    3.  It is bound to a specific collection in the database.
    4.  Custom methods and statics can be defined on a model.
    5.  Mongoose's middleware system can be used with models.

<br>

---
<br>

### Todays contents
- Seeding Script
- Mocking data
- Schema options

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
---
<br>

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

---
<br>

### Schema Options

When defining a schema, there are several options that can be specified for each field. These options allow us to specify the `type` of data that should be stored, whether the field is `required`, whether it should have `unique values`, and more.

- #### Specifying a Field Type
  When defining a schema field, we can specify the type of data that should be stored using the `type` option. For example, to specify that a field should store a string, we can use the following syntax:

  ```yaml
  {
    name: { type: String }
  }
  ```

  We can also specify other types such as `Number`, `Boolean`, `Date`, `Array`, and more.


- #### Making a Field Required
  To specify that a field is `required`, we can set the required option to true. For example:

  ```yaml
  {
    name: { type: String, required: true }
  }
  ```

  <span style="color:coral;">If a document is inserted into the collection without a value for a required field, an __error will be thrown__.</span>


- #### Unique Values
  To specify that a field should have unique values, we can set the `unique` option to true. For example:

  ```yaml
  {
    email: { type: String, unique: true }
  }
  ```
  This will ensure that each document in the collection has a unique value for the email field.  
  
  <span style="color:coral">There is a scalability pitfall to using the unique option with null values. MongoDB allows multiple documents to have a null value for a unique field, which can lead to unexpected behavior.</span>

- #### Setting a Default Value
  We can specify a default value for a field using the `default` option. For example:

  ```yaml
  {
    status: { type: String, default: 'active' }
  }
  ```
  If a document is inserted into the collection without a value for the status field, it will default to 'active'.


- #### Validation
  Mongoose provides several built-in validators that can be used to validate the data being stored in a schema field. For example, to validate that an email address is formatted correctly, we can use the match validator:

  ```yaml
  {
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    }
  }
  ```
  This will ensure that any value stored in the email field matches the specified regular expression.  
  
  We can also create custom validators using the `validate` option. validate option can take a function that will be called each time a document is `saved` or `updated`, and this function can perform any custom validation logic we need.
  The function should take two arguments: 
    - The value being validated 
    - A callback function that should be called with a boolean value indicating whether the validation passed or failed. Here's an example of how to define a custom validator that checks if a number is odd:

      ```js
      var UserSchema = new mongoose.Schema({
        age: {
          type: Number,
          validate: {
            validator: function(value, callback) {
              callback(value % 2 === 1);
            },
            message: 'Age must be an odd number'
          }
        }
      });
      ```
<br>

- #### Errors Messages
  When performing operations on a MongoDB collection, errors may occur. Mongoose provides several options for handling these errors. For example, we can define a custom error message for a field using the message option:

  ```js
  {
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Invalid email address'
    }
  }
  ```
  If a value is stored in the email field that does not match the specified regular expression, the error message __'Invalid email address'__ will be returned.

<br>

- #### Methods and Statics
  Mongoose allows us to define `methods` and `statics` that can be called on a `document` or `model`. For example, we can define a method that calculate the Age of a single user:

  ```js
  UserSchema.methods.getAge = function() {
    let ageInMs = Date.now() - this.birthdate.getTime();
    let ageInYears = parseInt(ageInMs / 3_600_000 * 24 * 365);
    return ageInYears;
  };
  ```
  then we can call this method on a document as follows:

  ```js
  var user = new User({ firstName: 'John', lastName: 'Doe' });
  user.getAge(); // '3'
  ```
  
  We can also define `statics` that can be `called on a model`. For example, we can define a static that returns all active users:

  ```js
  UserSchema.statics.activeUsers = function() {
    return this.find({ status: 'active' });
  };
  ```
  then we can call this `static on the User model` as follows:

  ```js
    const results = await User.activeUsers();
    console.log(results);
  ```
<br>

- #### Virtuals
  Virtuals are fields that are `not stored in the database` but are calculated based on other fields. For example, we can define a virtual that concatenate firstname and lastname to generate fullname:

  ```js
  UserSchema.virtual('fullname').get(function() {
    return `${this.lastname}, ${this.firstname}`
  });
  ```
  We can then access this virtual field as follows:

  ```js
  var user = new User({ firstname: 'John', lastname: 'Doe' });
  console.log(user.fullname); // `Doe, John`
  ``` 

  ### <span style="color:coral;">Attention:</span>
  - __Virtuals__: use virtuals when you define a vritual property on a <u>single document</u>
  
  - __Methods__: use methods when you need to define a method on a <u>single document</u>
  
  - __Statics__: use statics when you need to run a CRUD operation over entire collection of document ( <u>Model</u> )
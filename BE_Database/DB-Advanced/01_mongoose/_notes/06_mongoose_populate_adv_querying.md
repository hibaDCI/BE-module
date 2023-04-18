### Recap
1. Schema
2. CRUD
3. Sub documents
4. Update and Delete
5. Relational vs NonRelational


### Today Content
1. Deleting documents and their relatives
2. Using `populate()`
3. Advanced querying
---
<br>

# Populate and Select
- When working with databases and models, it's common to have relationships between entities. In Mongoose, we can use the `populate()` method <span style="color:orangered;">to fetch related entities when querying for a certain entity</span>. ***The populate() method accepts the name of the reference field as an argument.***  

- __For example__, let's say we have a `User model` that has `multiple Order` entities `associated` with it. We can use the populate() method to fetch all the orders associated with a particular user:

    ```js
    Order.findById(orderId).populate('user');
    ```  

    <span style="color:orange">In this example, we're fetching the Order entity by its ID and then populating the user field to retrieve user associated with that order.</span>
<br>

Sometimes, when we want to retrieve documents of an entity, 
- we can use the `select()` method to <span style="color:orangered;">specify which fields to include or exclude in the query results.</span> 
- The select() method accepts a `space-separated string of field names` as an argument.
  
  __For example__, let's say we only want to retrieve the name and email fields of a User entity:

    ```js
    User.find({})
    .select('name email') //retrive name and email from users documents
    .exec();              //executing the query
    ```  
    <span style="color:orange">In this example, we're querying for all the User entities and only retrieving the name and email fields.</span>

<br>

We can also use the populate() method along with the select() method to retrieve only specific fields from the related entities. 
- The populate() method accepts two arguments 
  - The `reference field name` and a 
  - Space-separated string of field names to retrieve from the related entity.

    For example, let's say we want to retrieve the name and price fields of all the items in an Order entity:

    ```js
    Order.findById(orderId)
    .populate('items', 'name price')
    .select('date description')
    .exec();
    ```  

    <span style="color:orange">In this example, we're fetching an Order entity (date and description) by its ID and then populating the items field to retrieve only the name and price fields of all the items in that order.</span>

---
<br>

### `Aggregate.prototype.exec()`
- In Mongoose, `a query is not executed until we call the exec() method`. 
- Executes the aggregate pipeline on the currently bound Model.
- Return a `Promise`

For example, in the following code:

```js
User.find({})
  .select('name email')
  .exec();
```
---
<br>

## Advanced querying:
- In addition to the basic querying methods, Mongoose provides advanced querying methods that allow us to `filter, sort, limit, and skip query results`.

- To filter query results based on a certain criteria, we can use the `where()` method along with other comparison methods such as `equals()`, `gt()`, `lt()`, and `in()`.

- __For example__, let's say we want to retrieve all the User entities with an email address of `example@gmail.com`:

    ```js
    User.find({})
    .where('email').equals('example@gmail.com')
    .exec();
    ```  
    <span style="color:orange">In this example, we're querying for all the User entities and filtering the results based on the email field using the where() and equals() methods.</span>

<br>

- To `sort` query results `based on a certain field`, we can use the `sort()` method. <span style="color:orangered">The sort() method accepts an object with the field name and the sort order</span> (either 1 for ascending or -1 for descending).

- __For example__, let's say we want to retrieve all the User entities sorted by their name field

    ```js
    User.find({})
    .where('email').equals('example@gmail.com')
    .sort("name")
    .exec();
    ```  

<style>
    span{
        color: coral;
    }
</style>

# Update & Delete in Mongoose

Today we will discuss about updating and deleting documents in a MongoDB database using Mongoose, a popular Object Data Modeling (ODM) library for MongoDB.
<br>

## Updating a document
To update a document in a MongoDB database using Mongoose, we can use the `findByIdAndUpdate()` method. This method takes two arguments: 
1. The ID of the document we want to update, and 
2. The new data we want to replace the existing data with. 
   
Here's an example:

```js
//await <model name>.findByIdAndUpdate(id, <data>);
await User.findByIdAndUpdate(id, {firstname: "Daniel"});
```

<br>

### 1. Getting back the updated document
<span>By default, the `findByIdAndUpdate()` method returns the original document before it was updated.</span> However, we can use the `new` update option to get back the updated document instead. 

Here's an example:

```js
// await <model name>.findByIdAndUpdate(id, <data>, { new: true });
await User.findByIdAndUpdate(id, {pasword: 'newPass'}, { new: true });
```
<br>

### 2. Ensuring schema validation
When updating a document, we may want <span>to ensure that the new data we're adding is valid according to our Mongoose schema</span>. We can do this by using the `runValidators` update option. 

Here's an example:

```js
// await <model name>.findByIdAndUpdate(id, <data>, { runValidators: true });
await User.findByIdAndUpdate(id, {pasword: 'newPass'}, { runValidators: true });
```
This will ensure that any data we're adding meets the validation requirements specified in our schema.

<br>

## Removing a document
To remove a document from a MongoDB database using Mongoose, we can use the findByIdAndRemove() method. This method takes the ID of the document we want to remove as its argument. Here's an example:

```js
// await <model name>.findByIdAndRemove(id);
await User.findByIdAndRemove(id);
```
This will remove the document from the database permanently.

<br>

### Best practices when removing documents
Here are some best practices to keep in mind when removing documents from a collection in Mongoose:

1. <span>Be careful when using the `deleteMany()` method</span>, as it can remove a large number of documents at once. Make sure you `specify the query object carefully` to avoid accidentally deleting more documents than you intended.

2. <span> Always use a query object to specify which documents to remove</span>. Never remove all documents from a collection without a query object, as this can have serious consequences.

3. <span>Always handle errors when removing documents.</span> If an error occurs, the document may not be removed as expected, and this could cause issues in your application.

4. <span>Consider using soft deletes instead of hard deletes.</span> With soft deletes, you don't actually remove the document from the collection, but instead mark it as "deleted" by `setting a deleted field to true`. 
This can be useful if you need to keep a record of all documents that have been deleted, or if you need to restore deleted documents later on.
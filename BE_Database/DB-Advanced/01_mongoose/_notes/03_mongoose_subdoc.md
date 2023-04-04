<style>
    span{
        color: coral;
    }
</style>

# Sub Documents

<span>Subdocuments in Mongoose allow you to **nest objects in a Schema**.</span> This can be useful for creating complex data structures and improving the organization of your code. In addition, **subdocuments can be used to share common data structures between multiple Schemas**.

<br>

## Nesting Objects in a Schema
To create a subdocument, you can ***define a new Schema and then include it as a property in another Schema***.  

For example:

```js

const trackSchema = new mongoose.Schema({
  title: String,
  duration: Number
});

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  releaseDate: Date,
  price: Number,
  tracks: [trackSchema] //array of sub documents
});
```

In this example, the `trackSchema` is defined first, and then included as a property in the `albumSchema` under the tracks field.

### 1. Using Sub Documents for Common Data Structures
Another use case for subdocuments is to <span>share common data structures between multiple Schemas</span>. For example, if you have multiple Schemas that all have an `address field`, you can define an `addressSchema` subdocument and include it in each of the parent Schemas.

```js
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: addressSchema
});

const companySchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: addressSchema
});
```

In this example, both the userSchema and companySchema include the addressSchema as a subdocument.

### 2. Removing IDs from Sub Documents
By default, subdocuments in Mongoose are assigned their own ***unique _id field***.  
However, you may want to remove this field in certain situations. To do this, you can pass `{ _id: false }` as an option to the Schema constructor.

```js
const trackSchema = new mongoose.Schema({
  title: String,
  duration: Number
}, { _id: false });

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  releaseDate: Date,
  price: Number,
  tracks: [trackSchema]
});
```
<br>

---

<br>

## Retrieve I: Updating Our Project's Controllers
In this section, we'll update our project's controllers to handle retrieving data from our database.

### 1. Getting All Documents in Collection
To <span>retrieve all documents in a collection</span>, you can use the find() method on the Mongoose model. For example:  

```js
const albums = await Album.find({});
```

In this example, we're retrieving all documents in the `Album` collection.

<br>

### 2. URL - Query Params
Query parameters are <span>a way to pass additional data to a URL</span>. In Express, __query parameters__ can be accessed through the `req.query` object. For example:

```javascript
// GET /albums?artist=The%20Beatles
const artist = req.query.artist;    // `The Beatles`
const albums = await Album.find({ artist });
```
In this example, we're retrieving all albums with an artist field that matches the query parameter.

<br>

### 3. Handling Model Errors
When working with models in Mongoose, errors can occur for various reasons. To handle these errors, we can use a `try...catch` block. For example:

```javascript
//using try...catch help me to keep the server up although get an Error.
try {
  const album = await Album.create(req.body);
  res.status(201).json(album);

} catch (e) {
  next(e);
}
```
In this example, we are catching any errors that occur when saving the album to the database and passing them to the error handling middleware.

<br>

## Retrieve II: updating our project's controllers
In our project's controllers, we will often need to retrieve data from the database. Here are some key points for retrieving data:
<br>

### 1. Route params
<span>Route parameters are variables that are part of the URL path.</span> In Express, we can access route parameters using `req.params` object. 

For example:

```javascript
app.get('/api/albums/:id', async (req, res) => {
  
  //read id from the params object
  const id = req.params.id; 
  const album = await Album.findById(id);
  res.send(album);

});
```
In this example, we are retrieving an album by its id, which is passed as a route parameter in the URL.

<br>

### 2. Getting a document by id
To retrieve a document by its id, we can use the `findById()` method. For example:

```javascript
const album = await Album.findById(id);
```
This will retrieve the album with the specified `id` from the database.

<br>

### 3. Handling unfound documents with http-errors
When retrieving a document by id, it's possible that the document may not exist in the database. To handle this situation, we can use the `http-errors` library to <span>create a 404 error</span>. For example:

```javascript
import createError from 'http-errors';

app.get('/api/albums/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const album = await Album.findById(id);
    if (!album) {
      throw createError.NotFound('Album not found');
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});
```
In this example, if the album is not found in the database, we create a `NotFound error` with a message of `"Album not found"`. The error is then passed to the error handling middleware.
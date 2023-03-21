# Error Handling Middleware Signature
---
- In an Express.js application, error handling middleware is used to ***catch errors that occur during the request-response cycle***. The error handling middleware function has the following signature:

    ```javascript
    (err, req, res, next) => { ... }
    ```

- The first argument `err` is the error object, followed by the `req` (request) and `res` (response) objects. The `next` function is used to pass control to the next middleware function in the stack.
---

### Changing Response Status
- In Express.js, you can change the response status using the `res.status()` method. This method sets the HTTP status code of the response.  
  
  For example, to set the response status to `404 (Not Found)`, you can use the following code:

    ```javascript
    res.status(404).send('Not Found');
    ```
This __sets the response status to 404__ and sends the string `'Not Found'` as the response body.

### Using the Error Handler
To use the error handler middleware, you need to __call the next function with an error object__.  

For example, suppose you have an error handler middleware function named errorHandler:

```javascript
app.use((err, req, res, next) => {
  //console.error(err);
  res.status(err.status || 500).send({message: err.message});
})
```
To use this middleware function, you need to call next with an error object:

```javascript
app.get('/', (req, res, next) => {
  try {
    // some code that might throw an error
  } catch (err) {
    next(err);
  }
});
```
In this example, if the code inside the try block throws an error, the catch block will call next with the error object, which will be caught by the error handler middleware.

### Catching 404s with a Default Route
In Express.js, you can catch 404 errors using a default route that matches all requests that don't match any other routes. For example:

```javascript
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
```
***This middleware function will match all requests that don't match any other routes and send a 404 response with the message 'Not Found'.***

---

### http-errors third-party module
- http-errors is a Node.js module that simplifies the process of creating and handling HTTP errors in Express.js applications. It provides a standardized mechanism for creating errors with specific HTTP status codes and error messages.

### Installation
To use http-errors in an Express.js application, you can install it using npm:

```bash
npm install http-errors
```

### Usage
Once installed, you can create an error using the `createError` function and pass it the `HTTP status code` and `error message`:

```javascript
const createError = require('http-errors');

app.get('/example', (req, res, next) => {
  next(createError(404, 'Not Found'));
});
```

- In the example above, a `404 error` with the message `'Not Found'` is created and passed to the __next function__, which passes control to the next middleware function with the error object.

You can also create custom error types by extending the HttpError class:

```javascript
import createError from 'http-errors';


app.get('/example', (req, res, next) => {
  if(err){
    next(createError(400, 'Bad Request'));
  }
});
```
In this example, an error is created by using the createError with a custom HTTP status code of 400 and a message of 'Bad Request'.

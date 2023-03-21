# Middleware in Express

### What is Middleware?
- In web development, __middleware__ refers to a function that executes between a received request, and a sent response.  

- Middleware functions can access the request and response objects and perform various operations on them before passing control to the next middleware function or the final request handler.  

- Middleware functions are a powerful tool in building robust and scalable web applications.


### Using Middleware

1. `app.use(<middleware>)`  

2. `app.use(<path>, <middleware>)`  

3. `app.post(<path>, [<middleware], <controller>)` 

In Express.js, middleware functions are used by calling the `app.use()` method. This method takes one or two arguments:  

- the first argument is the middleware function, 
- the optional second argument is the path on which the middleware function should be applied.  (If the second argument is omitted, the middleware function will be applied to all incoming requests.)

### Example of Third-party middleware
For example, to apply the `logger middleware function` to all incoming requests, you would use:

```javascript
import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(morgan('tiny'));
```

### Example of Express Core's middleware
To apply the `express.json()` middleware function to requests with the path `/api`, you would use:

```javascript
app.use('/api', express.json());
```
### Reviewing used middleware: \`logger()\`, \`express.json()\`
- __The logger() middleware function__ logs incoming requests to the console, including the HTTP method, URL, and response status code. It is often used for debugging and monitoring purposes.

- __The express.json() middleware function:__ Parses incoming JSON payloads and makes them available on the `req.body` property. This is useful when building RESTful APIs that accept JSON payloads.

### Reading middleware (usage order counts)
The order in which middleware functions are used matters. Middleware functions are executed in the order they are defined, so it's important to pay attention to the order in which they are used.  

Middleware functions can modify the request and response objects, and one middleware function may depend on the changes made by a previous middleware function.

### Middleware function signature: (req, res, next) => { ... }
Middleware functions have a specific signature that takes three `arguments: req, res, and next`. 
1. The req object represents the incoming HTTP request, 
2. The res object represents the outgoing HTTP response, 
3. The next function is a callback that is called to pass control to the next middleware function or the final request handler.

__For example__, a simple middleware function that logs the incoming request method and URL to the console might look like this:

```javascript
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
```

### Project organization II: The middleware directory
As an application grows in complexity, it's often helpful to ***organize middleware functions into their own directory***. This can make it easier to find and manage middleware functions as the application grows.

To create a middleware directory in your project, you can create a new directory called middleware and store your middleware functions there. You can then import and use them in your application like any other module.

For example, if you had a middleware function called auth that checks if the user is authenticated, you could define it in a file called auth.js in the middleware directory:

```js
// middleware/auth.js
export function auth(req, res, next) {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  next();
}

```
You can then use the auth middleware function in your application like this:

```js
import express from 'express';
import {autho} from './middleware/auth.js';

const app = express();
app.use(auth);
```




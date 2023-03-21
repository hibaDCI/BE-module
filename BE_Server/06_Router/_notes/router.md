# Routers in Express App
- When building a web application using the Express framework in Node.js, it's common to have ***multiple routes that share a common path***.  
In order to organize these routes and avoid repetitive code, we can use the `express.Router()` method.

- The `Router()` method returns an instance of a router, which can be used to define routes and middleware for a specific path.  
- We can then use the `app.use()` method to mount the router on a specific path in our application.


Here's an example:

```javascript
import express from 'express';
const app = express();

// create a router
const router = express.Router();

// define a route on the router
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// mount the router on a path
app.use('/api', router);
```

In this example, we've created a router and defined a route that responds to GET requests on the root path `("/")`. We then mount the router on the `"/api"` path using the `app.use()` method. This means that any requests to the `"/api"` path will be handled by the router.

--- 

### Chaining handlers: 
```js
router.route(<path>).get(<controller>).post(<controller>)
```
- In Express, it's common to have multiple middleware functions that need to be executed in a specific order. In order to simplify this process, ***we can chain multiple handlers together using the `router.route()` method.***

- The `router.route()` method __returns an instance of a single route__, which can be used to define multiple HTTP methods on the same path. We can then chain multiple middleware functions to the route using the HTTP method functions (`get()`, `post()`, `put()`, etc.).

Here's an example:

```javascript
import express from 'express';
const router = express.Router();

// define a route with multiple handlers
router.route('/users')
  .get((req, res, next) => {
    // handle GET request
  })
  .post((req, res, next) => {
    // handle POST request
  });
```  

In this example, 
1. we've defined a route that handles `GET` and `POST` requests on the `"/users"` path.  
2. We've chained two middleware functions to the route using the `get()` and `post()` methods.  

---   

### Project organization III: The routes directory
When building a large web application, it's important to organize our code in a way that makes it easy to manage and maintain. One common pattern for organizing routes in an Express application is to create a separate directory for them.
We can create a `"routes"` or `"routers"` directory in our project, and then create individual route files for each section of our application.  

For example, we might have a `"users.js"` file that contains all of the routes related to user management.

Here's an example directory structure:

```
project/
├── routers/
│   ├── users.router.js
│   └── products.router.js
├── controllers/
│   ├── users.controller.js
│   └── products.controller.js
└── app.js
```
    <!-- 

In this example, we've created a `"routes"` directory that contains two files: `"users.router.js"` and `"products.router.js"`.  

Each of these files would contain the route definitions for their respective sections of the application.

---

### REST III: PUT is for update, DELETE is for removal
In RESTful web applications, there are several HTTP methods that correspond to different types of operations. Two of the most commonly used methods are `PUT` and `DELETE`.

`PUT` is typically used to __update an existing resource__, while `DELETE` is used __to remove a resource__. These methods are often used




 -->
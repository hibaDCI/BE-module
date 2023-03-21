# Express

- Express is a popular Node.js framework.
- It simplifies the process of creating web servers. 
- It provides a number of useful features out of the box, such as `routing`, `middleware`, and `templating`.


To create a simple Express server, we first need to install the express package:

```bash
npm install express
```
We can then create an Express app by calling the express() function:

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

In the example above, we create an Express app that listens on port 3000. We use the app.get() method to define a route for the root URL (/), and the callback function simply sends "Hello World!" to the response.

___Express provides a simpler and more concise syntax for creating web servers, and also provides a number of features that are not available with the built-in http module.___ 

<!-- 
-->
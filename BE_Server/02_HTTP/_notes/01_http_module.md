# Working with Servers

This readme file provides an overview of how to work with servers in Node.js using the http and https modules.

## Overview of http and https modules
The ***http*** and ***https*** modules in Node.js are used for creating and interacting with servers that listen to ***HTTP*** and ***HTTPS***  requests respectively.  
The http module is used for handling HTTP requests while the https module is used for handling HTTPS requests. 

## Creating a (very) simple server: `http.createServer(<callback>)`  
This method is used to create an HTTP server. __The callback function is called each time a request is made to the server__. Inside the callback function, we can define how to handle the request and what response to send back. Below is an example of how to create a simple HTTP server that responds with `"Hello, World!"` to every request:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello, World!');
  res.end();
});

server.listen(3000);
```

## Working on ports: server.listen(<port>)
- The `server.listen(<port>)` method is used to start listening for incoming requests on a specific port. The port parameter specifies the port number to listen on. In the example above, the server is listening on port 3000.

## The request response cycle: `req object`, `res.write()`, `res.end()`
When a request is made to an HTTP server, the callback function is called with two objects: **the request object (req) and the response object (res)**.

- The ***req object***:  
  contains information about the request, such as the request __method__, __URL__, __headers__, and more. 
  
  
- The ***res object***:  
  To send a response back to the client, we can use the  
  - `res.write()` => method to write data to the response stream  
  - `res.end()` => method to end the response.  

  In the example above, we used `res.write('Hello, World!')` to write ***"Hello, World!"*** to the response stream, and `res.end()` to end the response.

That's it! You now have an overview of how to create a simple HTTP server in Node.js using the http module.





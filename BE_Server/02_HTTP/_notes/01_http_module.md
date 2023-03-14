# HTTP and HTTPS modules
The ***http*** and ***https*** modules in Node.js are used for creating and interacting with servers that listen to ***HTTP*** and ***HTTPS***  requests respectively.  

## Creating a (very) simple server: `http.createServer(<callback>)`  

- This method is used to create an HTTP server. 
- __The callback function is called each time a request is made to the server__. 
- Inside the callback function, we can define how to handle the request and what response to send back. 
- An example of how to create a simple HTTP server that responds with `"Hello, World!"` to every request:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello, World!');
  res.end();
});

server.listen(5000);
```
## Working on ports: server.listen(<port>)
- This method is used to start listening for incoming requests on a specific port. 
- The port parameter specifies the port number to listen on. 
- In the example above, the server is listening on port 5000.

## The request response cycle
When a request is made to an HTTP server, the callback function is called with two objects: 
  1. request object (req):  
  Contains information about the request, such as the request __method__, __URL__, __headers__, and more. 
  1. response object (res):  
  To send a response back to the client, we can use the  
     - `res.write()` => method to write data to the response stream  
     - `res.end()` => method to end the response.  
    

  In the example above, we used `res.write('Hello, World!')` to write ***"Hello, World!"*** to the response stream, and `res.end()` to end the response.

 -->
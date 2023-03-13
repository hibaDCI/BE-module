# Working with External Servers in Node.js
Node.js provides a built-in http module that allows developers to make HTTP requests to external servers. This can be useful for accessing APIs or fetching data from other websites.

## Making GET Requests with http.request()
To make a GET request with `http.request()`, you first need to create an options object that specifies the URL of the server you want to call, as well as any other relevant information such as the headers you want to send. You can then pass this options object and a callback function to `http.request()`, which will be called when the server responds.

Here's an example of how to make a GET request using `http.request()`:

```javascript
const http = require('http');

const options = {
  hostname: 'example.com',
  path: '/api/data',
  method: 'GET',
};
const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });
  res.on('end', () => {
    console.log('Request completed.');
  });
});

req.on('error', (error) => {
  console.error(`Got error: ${error.message}`);
});

req.end();
```
This code sends a __GET__ request to `example.com/api/data` and logs the length of the response data to the console as it arrives. When the response ends, it logs a completion message.  


## Working with Events
When you make a request with __http.request()__, you get back a ClientRequest object that emits several events. The response event is emitted when the server responds, and you can listen for this event to read the response data.

Here's an example of how to use events to read the response data:

```javascript
const http = require('http');

const options = {
  hostname: 'example.com',
  path: '/api/data',
  method: 'GET',
};

const req = http.request(options);

req.on('response', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Received ${data.length} bytes of data.`);
  });
});

req.on('error', (error) => {
  console.error(`Got error: ${error.message}`);
});
req.end();
```

This code does the same thing as the previous example, but uses the response event to read the response data. The data event is emitted whenever a new chunk of data is received, and the end event is emitted when the response is complete.

## The `http.get()` Shortcut
If you just need to make a simple GET request and don't need as much control over the request options, you can use the http.get() shortcut instead of http.request(). This method takes a URL string and a callback function, and automatically sets the method to GET.

Here's an example of how to use http.get():

```javascript
const http = require('http');

http.get('http://example.com/api/data', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Received ${data.length} bytes of data.`);
  });
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`);
});
```

This code does the same thing as the previous examples, but uses `http.get()` to make the request. The `on('error')` method is called if an error occurs during the request.
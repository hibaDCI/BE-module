# Third party modules
There are several packages available in Node.js to make HTTP requests. Three popular packages are `node-fetch`, `request`, and `axios`.
### node-fetch
`node-fetch` is a minimalistic package for making HTTP requests. It supports both HTTP and HTTPS protocols and provides a Promise-based API.


```javascript
const fetch = require('node-fetch');

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### request
request is a popular package for making HTTP requests. It supports both HTTP and HTTPS protocols and provides a callback-based API.

```javascript
const request = require('request');

request('https://jsonplaceholder.typicode.com/posts', (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.parse(body));
});
```

### axios
axios is another popular package for making HTTP requests. It supports both HTTP and HTTPS protocols and provides a Promise-based API.

```javascript
const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### The joy of axios
axios provides a simple and easy-to-use API for making HTTP requests. It also supports `interceptors`, which allows you to modify requests and responses before they are sent or received.

```javascript
axios.interceptors.request.use(config => {
  console.log(`Making request to ${config.url}`);
  return config;
});

axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## axios and async/await
axios also supports async/await, which makes it easy to write asynchronous code that looks synchronous.

```javascript
async function getPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getPosts();
```


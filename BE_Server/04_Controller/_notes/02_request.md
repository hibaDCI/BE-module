# The Request Object: \`req\`
The req object in JavaScript frameworks like Express contains information about the incoming request, including the `HTTP method, headers, URL, and any query parameters`.

For example, to handle a GET request for a particular resource, you might define a route like this:
```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  // Logic to retrieve the user with the specified ID
  res.send(user)
})
```

In this example, the __req object__ is used to __extract the id parameter from the URL__ and then __retrieve the corresponding user__ from a database or other data source.

## Receiving JSON Requests: \`req.body\`
In many cases, clients will send data to the server in the form of a __JSON request body__. To receive and process JSON requests in JavaScript, you can ***define a route that uses the `app.post()` method and then extract the data from the `req.body` object***.


__For example__, to handle a POST request to create a new user, you might define a route like this:  

```javascript
app.post('/users', (req, res) => {
  const userData = req.body
  // Logic to create a new user with the specified data
  res.send(newUser)
})
```
In this example, the req.body object is used to extract the user data from the JSON request body and then create a new user with that data.

### REST II: POST is for Creating Data
In the REST architectural style, the HTTP POST method is typically used for creating new resources. 

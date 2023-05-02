
# Cookies 

## State and the server - Stateless HTTP
In a stateless HTTP protocol, `the server does not store any information about previous requests made by the client`. This means that every time the client sends a request, the server treats it as a new request and sends a response accordingly. 

This can create problems when developing web applications that require state to be maintained between requests.

## Cookies
One way to maintain state between requests is through the use of cookies. 
- `Cookies are small text files that are stored on the client's computer and can be accessed by the server`. 

- Cookies are `sent along with every request` made to the server, allowing the server to read and write data from and to the cookie.

### Using cookies to save state across requests
Cookies can be used to save state across requests. For example, a `user's login credentials` can be stored in a cookie, `allowing the user to remain logged in between requests`.

![Cookie Diagram](./_images/cookies.png)

### Setting cookies
Cookies can be set in the server response using the `res.cookie()` method. This method takes two parameters: 
- The name of the cookie and t
- The value of the cookie.
- The options parameter

```javascript
res.cookie('username', 
           'john.doe', 
           {httpOnly: true, expires: Date.now() + 3_600_000 * 24 });
```

### Using cookieParser to read cookies: req.cookies
To read cookies sent from the client, the `cookie-parser` middleware can be used. This middleware `parses the Cookie header sent by the client and populates the req.cookies object` with the parsed cookies.

```javascript
//in server.js file
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```


```javascript
//How to read cookies from sub-sequent requests?
app.get('/', (req, res) => {
  
  const username = req.cookies.username;
  res.send(`Welcome back, ${username}!`);

});
```


### Cookie pitfalls: memory limit, security vulnerabilities
While cookies are a useful tool for maintaining state, there are some potential issues to keep in mind. One issue is the memory limit of cookies. Each cookie can store only a limited amount of data, typically around `4KB`. 

Another issue is that cookies can be vulnerable to security attacks, such as cross-site scripting (XSS) and cross-site request forgery (CSRF). `Care should be taken to ensure that cookies are used securely to avoid such vulnerabilities`.
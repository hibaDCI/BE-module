# Authentication II
## JsonWebToken
JSON Web Token (JWT) is a `standard way of representing and transmitting information securely` between parties in a compact and verifiable format. 

- When a user logs in to a web application, the server generates a JWT and sends it back to the client. <span style="color:orange;">The client can then include the JWT in subsequent requests to the server, which can use the token to authenticate and authorize the user.</span>
  

### JWT consists of three parts: 
1. **Header**: The header contains metadata about the token, such as the algorithm used for signing the token.
2. **Payload**: The payload contains the actual data that is being transmitted, such as user information or access permissions.
3. **Signature**: The signature is used to verify that the token has not been tampered with during transmission.


### Why Do I need JWT for (Express) server apps?
JWT can be a good choice for authentication in your Express app for several reasons:
1. **Statelessness**: 
   `JWTs are self-contained and carry all the necessary information`, including the user identity and access permissions, within the token itself. This means that the `server does not need to store any session data or user state`, making it easier to scale your application.

2. **Security**: 
   `JWTs are digitally signed, which means that the server can verify the integrity of the token` and ensure that it has not been tampered with. This can help prevent attacks like cross-site request forgery (CSRF) and session hijacking.

3. **Flexibility**: 
   JWTs are `designed to be interoperable across different systems and programming languages`, making them a flexible choice for authentication in a microservices architecture.

4. **Compatibility**: 
JWTs can be used with a `variety of authentication methods`, such as `OAuth` and `OpenID Connect`, allowing for seamless **integration with third-party services**.

<br>

### Create Tokens
To creates a token, we will be using the 

```js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

async function createToken(payload, secret, options){
    
    const signAsync = promisify(jwt.sign);
    return await signAsync(payload, secret, options);
}
```  
<br>

- because the method `jwt.sign()` is `asynchronous` by default, it uses a callback function to return the signed token.
  
- However, it also has a `synchronous version` that return the signed token directly. 
- In general, it's recommended to use the `asynchronous` version of `jwt.sign()` because it's `non-blocking and won't hold up the event loop` while the token in being signed. this can be especially imporant in high-traffic applications where you want to avoid any unnecessary delays.
- Now we can create a token by calling the `createToken` function with the payload, secret, and options.

<br>

### Validating Tokens
To validate a JWT, we use the `jwt.verify()` method from the jsonwebtoken library. We can also create a wrapper function that uses Promises.

```js
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

//verify the given token
export async function verifyToken(token, secret) {
    const verifyAsync = promisify(jwt.verify);
    return await verifyAsync(token, secret);
}
```
Now we can validate a token by calling the `verifyToken()` function with the token and secret.

<br>

### Expecting Authentication headers
To validate the JWT on every request, we can create a `custom middleware function that checks for the Authorization header and validates the token`.

```js
import { verifyToken } from './utils/jwt.js'

export function authToken() {

    return async (req, res, next) => {
        try {
        
        //read authorization header from request object
        const authHeader = req.headers['authorization'];
        //extract token
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return createError(401, 'Token Not Found!');
        }
    
        //verify token by using verifyToken function created above
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        req.jwt = decoded;
        return next();
        
        } catch (error) {
            next(error)
        }
    }
}
```
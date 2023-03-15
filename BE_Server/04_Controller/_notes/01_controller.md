
## MVC (Model-View-Controller)
MVC, or Model-View-Controller, is a popular architectural pattern used in software development. It divides an application into three interconnected components:  

![MVC Architecture](./mvc.png)

- ***Model***: The model represents the data of the application.
- ***View***: The view is responsible for rendering the user interface of the application.
- ***Controller***: The controller acts as an intermediary between the model and view, handling user input and updating the model and/or view as necessary.

## Benefits of MVC
There are several benefits to using MVC in software development:

- __Separation of Concerns__:  
  By separating an application into distinct components, each component can focus on its own specific concerns without interfering with the others. This makes the application easier to develop, test, and maintain.  
  
- __Modularity__:  
  Because the components of an MVC application are decoupled, they can be developed and tested independently, making it easier to scale and modify the application over time.  
  
- __Reusability__:  
  The separation of concerns and modularity also make it easier to reuse code across multiple applications or components.  

- __Improved Collaboration__:  
  Because each component has its own specific responsibilities, it is easier for developers and designers to work together on different parts of the application without stepping on each other's toes.  
  
Overall, the MVC architecture is a powerful tool for building complex applications that are both modular and maintainable.


## Controller
In the MVC architecture, the ***controller*** is responsible for:  
1. Handling user requests 
2. Updating the model and/or view accordingly. 
3. Aacts as a mediator between the model and the view, 
4. Processing user input
5. Manipulating the data as necessary.

### Attaching Controllers to Express App
To attach a controller to our Express app, we can use the following method to specify the path that the controller should handle. 
```javascript
app.get(<path>, <controller>) 
```

***Example:***

```javascript
app.get('/users', UserController.getAllUsers)
```
In this example, the `getAllUsers` function is the controller that will handle requests to the `/users` path.


## REST I: GET is for Reading Data  
REST, or `Representational State Transfer`, is a popular architectural style for building web applications.  
In __REST__, resources are represented as __URIs__ (Uniform Resource Identifiers), and the client interacts with those resources using standard HTTP methods.

### HTTP Methods
RESTful APIs typically use the following HTTP methods to interact with resources:

- __GET:__ Used for reading data from a resource.  
- __POST:__ Used for creating a new resource.  
- __PUT:__ Used for updating an existing resource.  
- __DELETE:__ Used for deleting a resource.  

In the context of a RESTful API, the HTTP GET method is typically used for reading data from the server. For example, a __GET__ request to `/users` might **return a list of all users** in the database.

## Sending Responses
When a controller processes a request, it typically needs to send a response back to the client. The res object in Express provides several methods for __sending responses__, including `res.send()` and `res.json()`.

`res.send()` is used to send a simple string response to the client:

```javascript
res.send('Hello, world!')
res.json() 
```

is used to send a JSON response to the client:
```javascript
res.json({ message: 'Hello, world!' })
```

## Project Organization I: The Controllers Directory
As your Express app grows in complexity, it's a good idea to organize your code into separate files and directories.  

One common pattern is to ***create a controllers directory*** to hold all of your controller functions. For example, you might have a file called `UserController.js` that exports functions for handling user-related requests.
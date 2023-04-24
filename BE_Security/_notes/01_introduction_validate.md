# Server Security

## 1. Data validation
When it comes to working with data, it's important to ensure that it is `consistent` and `secure`. In this part of the course, we'll explore how to make your data consistent and secure using `server-side validation`.

<br>

- ### Importance of server-side validation
  Server-side validation is important for several reasons. 
  1. It can help `prevent security vulnerabilities` such as ***SQL injection attacks*** and ***cross-site scripting attacks***. 
    

  2. Additionally, it can ensure that the data being submitted is in the `correct format`, which can help `prevent errors` and ensure that your application runs smoothly.

<br>

- ###  Validator.js Module
  One tool that can be used for server-side validation is `validator.js`. This library `provides a number of functions that can be used to validate data`.  

  For example, 
  ```js
  validator.isEmail(<string>)
  ```
  can be used to check if a given string is a valid email address.

<br>

- ### express-validator Module
  Another library that can be used for server-side validation is express-validator. `This library provides a simple and easy-to-use interface for validating data in an Express.js application`. To add express-validator to your project, simply install it using npm:

  ```bash
  npm install express-validator
  ```

  Validating fields: 
  ```js
  check(<field name>).<matcher function>
  ```
  Once you've installed \`express-validator\`, you can start using it to validate fields in your Express.js application. To validate a field, you can use the `check()` function followed by a matcher function. 

  For example, `check('email').isEmail()` can be used to validate that the email field is a valid email address.

<br>

- ### Checking for errors
  After validating the data, it's important to check for errors to ensure that the data is in the correct format. This can be done using the `validationResult()` function provided by express-validator.
- ### Parsing the request
  To parse the request and check for errors, you can use the `validationResult()` function. ***This function takes the req object as an argument and returns a ValidationResult object***.

  ```js
  import {body, validationResult} from 'express-validator';

  app.post('/', body('email').isEmail(), (req, res, next)=>{
      //parse the validation errors in request object
      const errors = validationResult(req);
  })
  ```

<br>

- ### Checking the result
  To check if there are any errors, you can use the `isEmpty()` function provided by the ValidationResult object. This function returns true if there are no errors and false otherwise.
  ```js
  import {body, validationResult} from 'express-validator';

  app.post('/', body('email').isEmail(), (req, res, next)=>{
      const errors = validationResult(req);
      
      //checking the result
      if(!errors.isEmpty()){
          return res.status(400).json({
              message: 'validation errors',
              errors: errors.array()
          })
      }
  })
  ```

<br>

- ### Formatting to an array: 
  If there are errors, you can use the `array()` function provided by the ValidationResult object to format the errors as an array.

  ```js
  errors: errors.array()
  ```


  ### Adding custom messages: 
  ```js
  check(<field name>)
    .<matcher function>
    .withMessage(<message>)
  ```

  Finally, you can add custom error messages using the `withMessage()` function provided by express-validator. This function can be called after the matcher function and takes a string argument representing the custom error message.

  ```js
  const { check, validationResult } = require('express-validator');

  app.post('/user',
    [
      check('username')
        .notEmpty().withMessage('Username field is required.')
        .isLength({ min: 3 }).withMessage('Username min 3Char length'),
      check('email')
        .notEmpty().withMessage('Email field is required.')
        .isEmail().withMessage('Invalid email format.')
    ],
    
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // ...rest of the code
    }
  );
  ```

<!-- 

---

<br>

## 2. Sanitize Data
  - Sanitization is `the process of removing unwanted or harmful elements from data,` typically user input. Here are some techniques to consider for sanitizing your data:

<br>

- ### Importance of sanitization
  Sanitization is crucial for `protecting against various security vulnerabilities` such as __cross-site scripting (XSS)__ attacks, __SQL injection attacks__, and __command injection__ attacks. By properly sanitizing user input, you can prevent these types of attacks and keep your application secure.


  ### 2.1 Escaping HTML
  One way to sanitize user input is to escape any HTML characters that may be present. 
  ```js
  check(<field name>).<matchers>.escape();
  ```

  The `escape()` function can be used in conjunction with a validation library, such as express-validator, to automatically escape any HTML characters in user input. 
  
  For example:

  ```scss
  check('description').escape()
  ```
  This will escape any HTML characters in the description field.


  <br>

  ### 2.2 Normalizing emails: 
  Another technique for sanitizing user input is to `normalize email addresses`.
  ```js
  check(<field name>).<matchers>.normalizeEmail()
  ```
  Email addresses can be entered in a variety of formats, so normalizing them can help ensure consistency and prevent certain types of attacks. 
  
  The `normalizeEmail()` function can be used in conjunction with a validation library, such as express-validator, to automatically normalize email addresses. 
  
  For example:

  ```js
  check('email').normalizeEmail()
  ```
  This will normalize the email field.

  ### 2.3 Trimming strings: 
  Trimming strings can be useful for removing any leading or trailing whitespace from user input. 
  ```js
  check(<field name>).<matchers>.trim()
  ```
  The `trim()` function can be used in conjunction with a validation library, such as express-validator, to automatically trim whitespace from user input. 
  
  For example:

  ```js
  check('username').trim()
  ```
  This will trim any whitespace from the username field.

<br>

---

<br>

## 3. Format
Properly formatting your code is important for readability, maintainability, and collaboration. Here are some techniques for formatting your validation code:

  ### 3.1 Create a custom middleware for validation boilerplate
  
  One technique for organizing your validation code is to `create a custom middleware that handles validation for all incoming requests`. This can help reduce boilerplate code and ensure consistency across your application. 
  
  For example:

  ```js
  const validate = (validations) => {
    return async (req, res, next) => {
      
      await Promise.all(validations.map((validation)=> validation.run(req)))

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      return next();
    }
  }
  ```
  This middleware takes an array of validations as input and validates the request body against them. If there is an error, it sends a 400 status code with the error message. Otherwise, it passes control to the next middleware in the chain.

  <br>

  ### 3.2 Project Organization IV: The validation directory
  Another technique for organizing your validation code is to create a separate validation directory within your project. This directory can contain all of your validations, making it easy to find and maintain your validation code. For example:

  ```bash
  project/
  ├─ controllers/
  ├─ models/
  ├─ routes/
  └─ validation/
   ``` 
  -->
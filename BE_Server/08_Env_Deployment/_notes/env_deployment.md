
# Getting our Server Online
- In order to get our server online, we need to first decide __where we want to host it__. There are many options available such as `AWS, Google Cloud, DigitalOcean, Heroku, Render` and many others. 
  
- Once we have selected a hosting platform, we need to configure our server to run our application. ***This may involve installing dependencies, and configuring environment variables***.

## Environment Variables
### Development vs. Production
- Environment variables are used to store sensitive information such as `API keys, database credentials, and other secrets` that our application needs to function properly.  
- It is important to distinguish between `development` and `production` environment variables.  
  - Development environment variables are used when we are working on our local machine, 
  - Production environment variables are used when our application is running on the server.

## Project Organization VI: The config folder:
- The config folder is a common place to store configuration files for a Node.js application. This folder can contain different files for different environments, such as development.js, production.js, and test.js, each containing configuration settings specific to that environment. 
  
- The config folder can also contain a default.js file that contains common settings shared across all environments.

### Centralizing secrets in one place: config/environment.js:
- In order to keep sensitive information like `API keys and database passwords` separate from the application code, it's common to use a config module that centralizes all the configuration settings in one place. 
- The `config/environment.js` file can contain sensitive information and can be excluded from version control using .gitignore to ensure that the information is kept private.

Example `config/environment.js`
```js
export const env = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.DATABASE_URL || "mongodb://localhost:27017/",
  jwtSecret: process.env.JWT_SECRET || "my-secret-key",
};
```

## Deployment intro
#### Defining production secrets
When we are ready to deploy our application to production, we need to define our production environment variables. These variables should be stored securely and only accessible to authorized personnel.

#### Using Render (https://render.com/)
- Render is a cloud platform that makes it easy to deploy and manage web applications. 
- With Render, we can deploy our application with just a few clicks and automatically scale it to handle traffic. Render also provides a secure and easy-to-use interface for managing our environment variables, making it a great choice for deploying our application to production.




# Authentication and Access Control
## Introduction
When building a backend express server, `security should always be a top priority`. This involves implementing various measures to prevent unauthorized access to sensitive data and protect against attacks. 

## Authentication and Access Control
- Authentication involves `verifying the identity of a user before granting access` to protected resources.
- Access control involves defining` who has access to specific resources` and what actions they can perform on those resources.


## Encryption
- Encryption is the process of `encoding data to prevent unauthorized access`. 
- In a backend express server, encryption is commonly used to store and transmit sensitive data such as **passwords** and **payment information**. 
- One popular encryption library for Node.js is `bcrypt`, which uses a combination of `hashing` and `salting` to securely store passwords.

    #### 1. Why should hash the password and payment information?
    - If the plain-text passwords or payment information are stored in a database, they can be `accessed by` anyone with access to the database, including `attackers` who gain unauthorized access. This can lead to serious security breaches, such as identity theft or fraudulent charges.

    #### 2. What is Hashing?
    - Hashing is the process of `converting plaintext data into a fixed-length string` of characters, called a hash.
    
    - The hash is `unique to the input data`, so even a small change to the input will result in a completely different hash.
    -  This makes it `difficult to reverse-engineer` the original data from the hash.


    #### 3. What is Salting?
    - Salting is the process of `adding a random string (the salt) to the plaintext data before hashing`. 
    - This makes it even `more difficult to reverse-engineer` the original data, as an attacker would need to know both the salt and the hashing algorithm used to generate the hash.


## Hashing
- To hash a plaintext password using bcrypt, we can use the `bcrypt.hash()` method. 
- This method takes two arguments: 
  - the plaintext password and 
  - the number of salt rounds to use. 
- The `higher` the number of `salt rounds`, the `more secure` the hash will be, but also the `longer` it will take `to generate` the hash.
- `bcrypt` is a library to help you hash passwords. use the following command for installation:
  
    ```bash
    npm install bcrypt
    ```
- Implementing a pre-save middleware function using mongoos middlewares functionality in Node.js. The function called before saving the user's data into database, and it hashes the password using the bcrypt library if the password field has been modified.

    ```js
    /** hash the password */
    import bcrypt from 'bcrypt';

    userSchema.pre('save', async function (next) {
    try {
        //run this function if password was modified 
            if (!this.isModified('password')) return next();

            //generate the salting value
            const salt = await bcrypt.genSalt(10);
            //hash the password
            this.password = await bcrypt.hash(plainTextPassword, salt);

            next();

        } catch (error) {
            next(error)
        }
    });
    ```


### Salting: Salt Rounds and Performance
- As mentioned earlier,` the number of salt rounds affects the security and performance of our hashing function`. 

- A higher number of salt rounds means a more secure hash, but also slower performance. It's important to strike a balance between security and performance, depending on the specific needs of our application.


## Comparing Hashed value with PlainText value
- To compare a plaintext password to a hashed password, we can use the `bcrypt.compare()` method. 

- This method takes two arguments: 
  - the plaintext password 
  - the hash value. 
  
    ```js
    import bcrypt from 'bcrypt';

    userSchema.methods.comparePassword = async (textPassword, hashedPassword)=>{
        try{
            return await bcrypt.compare(textPassword, hashedPassword)
        
        }catch(error){
            next(error)
        }
    }
    ```
- If the two passwords match, `bcrypt.compare()` will return `true`. If they do not match, it will return `false`.

- Using `bcrypt.compare()` is a secure and reliable way to compare plain text and hashed passwords in Node.js.

- In conclusion, implementing proper security measures in our backend express servers is crucial to protect against attacks and maintain the integrity of our data. 

- By utilizing authentication and access control, as well as encryption techniques like hashing and salting, we can ensure that our servers remain secure. 
<!--




-->
 # Running JS on Operating System (OS)
- Running JavaScript on the OS is a powerful way to build applications that can interact with the `file system, network, and other system resources`. One popular way to achieve this is by using Node.js, a JavaScript runtime built on the Chrome V8 engine.

- Node.js allows developers to write server-side code in JavaScript and run it outside of a web browser. This opens up many possibilities for building command-line tools, web servers, and other types of applications that require access to the file system, network, or other system resources.

- When working with Node.js, developers typically use npm (Node Package Manager) to manage dependencies and package their applications. This involves creating a package.json file that lists all the dependencies needed by the application, as well as scripts that can be run using the npm run command.

- One key difference between client-side JavaScript and Node.js is that Node.js provides access to both `host objects` and `native objects`. Host objects are provided by the environment in which Node.js is running, such as the file system or network, while native objects are built into JavaScript itself, such as arrays and objects.

- One example of a host object provided by Node.js is the `process` object. This object provides information about the current Node.js process, such as its ID, the arguments passed to it, and the environment variables set for the process. Developers can use the process object to interact with the file system, spawn child processes, and more.

- To print output to the terminal when running a Node.js script, developers can use the console.log() function. This function takes any number of arguments and prints them to the terminal.

- To get arguments passed to a Node.js script, developers can use the `process.argv` array. This array contains the command-line arguments passed to the Node.js process, including: 
  1. The path to the Node.js executable 
  2. The path to the script being run. 

Developers can use `process.argv.slice(2)` to get any additional arguments passed to the script.

- To exit a Node.js process, developers can use the `process.exit()` function. This function takes an optional exit code, which can be used to indicate success or failure.

- Finally, when debugging Node.js applications, developers can use the `node --inspect` command to start a debugging session. They can also use `nodemon` to automatically restart the Node.js process when changes are made to the code. 



## Summary
- Node.js allows developers to run JavaScript on the OS to build apps that interact with file systems, networks, and system resources.
npm is used to manage dependencies and package applications.
- Node.js provides access to both host and native objects, e.g., the process object, which provides information about the current Node.js process.
- console.log() is used to print output, and process.argv is used to get arguments passed to a Node.js script.
- process.exit() is used to exit a Node.js process, and debugging can be done using node --inspect or nodemon.

 <!--
- -->
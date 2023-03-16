# Mock Database for Quick Prototyping
With a mock database, developers can focus on the logic of their application without worrying about the complexities of __data storage and retrieval__.

### Reading and Writing to JSON File: Lowdb
- Lowdb is a __lightweight, easy-to-use JSON database__ that allows developers to store data in a file.  
- It's particularly useful for __small to medium-sized projects__ that don't require a full-fledged database system. 
- Lowdb __uses a simple syntax__ for reading and writing data, and it's easy to set up and get started with.

### Setting up Lowdb
To set up Lowdb, you'll need to create a data directory where your JSON file will be stored. Once you have a data directory, you can initialize Lowdb with the following code:

```javascript
import { Low, JSONFile } from 'lowdb';
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
db.data ||= {users: []};

await db.read()     //read data from the file db.json
await db.write()    //write data into the file db.json
```
This code initializes Lowdb with a file adapter that points to the `db.json` file in the specified path. Once you've initialized Lowdb, you can start reading and writing data to the file.

<!-- 
 -->
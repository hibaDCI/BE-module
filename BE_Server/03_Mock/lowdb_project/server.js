import express from 'express';
import { Low, JSONFile } from 'lowdb';
import { addNewUser, deleteUser, getUsers, updateUser } from './user_controller.js';
import cors from 'cors';

//1.create express server
const app = express();
app.use(express.json());
app.use(cors());

//setup lowdb
const adapter = new JSONFile('db.json'); //create the adapter
export const db = new Low(adapter);
await db.read();

//set intial value
db.data ||= { users: [] }     // db.data = db.data || {users: []} 




//define a route to get all users
app.get('/users', getUsers);

//add a new user
app.post('/users', addNewUser);

//delete a user
app.delete('/users', deleteUser)
 
//update a user
app.patch('/users/:userid', updateUser)





//2. define port
const port = 5000;
app.listen(port, console.log('Server is up on port:',port))
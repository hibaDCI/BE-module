import express from 'express';
import { Low, JSONFile } from 'lowdb';

//1.create express server
const app = express();
app.use(express.json());

//setup lowdb
const adapter = new JSONFile('db.json'); //create the adapter
const db = new Low(adapter);
await db.read();

//set intial value
db.data ||= { users: [] }     // db.data = db.data || {users: []} 




//define a route to get all users
app.get('/users', (req, res) => { 
    console.log(db.data)
    res.send(db.data)
 })


//add a new user
app.post('/users', async(req, res) => { 
    const newUser = req.body;
    db.data.users.push(newUser);
    await db.write();
    res.send(db.data)
})
 
//delete a user
app.delete('/users', async(req, res) => { 
    db.data.users = db.data.users.filter(u => u.id != req.body.id);
    await db.write();

    res.send(db.data);
 })


 //update a user
//app.put()



//2. define port
const port = 5000;
app.listen(port, console.log('Server is up on port:',port))
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
    res.send(db.data.users)
 })


//add a new user
app.post('/users', async(req, res) => { 
    const newUser = req.body;
    db.data.users.push(newUser);
    await db.write();
    res.send(db.data.users)
})
 
//delete a user
app.delete('/users', async(req, res) => { 
    db.data.users = db.data.users.filter(u => u.id != req.body.id);
    await db.write();
    res.send(db.data);
 })


 //update a user
app.patch('/users/:userid', async(req, res) => { 
    //to read the parameter userid
    let userid = req.params.userid;
    //loop on users array 
    //find the user with given userid
    //update it
    db.data.users = db.data.users.map((user) => {
        if (user.id == userid) {
            user.name = req.body.name
        }
        return user
    });

    await db.write()

    res.send(db.data.users)
 })



//2. define port
const port = 5000;
app.listen(port, console.log('Server is up on port:',port))
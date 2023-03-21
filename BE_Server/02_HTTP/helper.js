import express from 'express';
import { Low, JSONFile } from 'lowdb';
import lodash from 'lodash';
import fs from 'fs'


//create server
const app = express();
app.use(express.json())
const port = 5000;


const adapter = new JSONFile('db.json');
const db = new Low(adapter);
db.data ||= { users: [] }                   //intial data



/* ------------------------- add new user ------------------------- */
app.post("/users/add", async (req, res) => {
  try {
    const newUser = { ...req.body };
    let users = db.chain.get('users').push(newUser).value()
    await db.write()
    res.send(users);
    
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


/* ------------------------- get all users ------------------------ */
app.get('/users/all', async (req, res) => {
  try {
    let users = db.chain.get('users').value();
    res.send(users)

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})


//listen to port number
app.listen(port, () => console.log('Server is up on port:', port));
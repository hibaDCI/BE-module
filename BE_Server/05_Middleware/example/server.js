import express from 'express';
import cors from 'cors';
import { welcome } from './controllers/general.controller.js';
import { Low, JSONFile } from 'lowdb';
import { register } from './controllers/users.controller.js';

const app = express();
app.use(express.json());
app.use(cors());

//lowdb
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
//db initial
db.data ||= { users:[]}


//routes
//GET http://localhost:5000/
app.get('/', welcome);

//register
// POST http://localhost:5000/register
app.post("/register", register)


const port = 5000;
app.listen(port, console.log('The server is up 👻'));
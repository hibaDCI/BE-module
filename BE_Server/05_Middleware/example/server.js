import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { welcome } from './controllers/general.controller.js';
import { Low, JSONFile } from 'lowdb';
import { register } from './controllers/users.controller.js';
import { first_MW, print_get_request, second_MW } from './middlewares/general.middleware.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));                            //execute for all requests
app.use(first_MW);
app.use(second_MW);

// app.use(print_get_request)
// app.use('/register', print_get_request);         //execute only for requests started with '/register'

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
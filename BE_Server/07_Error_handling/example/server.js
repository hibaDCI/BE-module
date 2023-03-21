import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import { userRouter } from './routers/users.router.js';


//create app
const app = express();

//lowdb database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
//set initial db
db.data ||= {users: []}


//core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));


//routers
app.use('/users', userRouter);


//error handler undefined routes
//main error handler




//port
const port = 5000;
app.listen(port, console.log(`server is up on port: ${port}. 👻`));
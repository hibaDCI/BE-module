import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Low } from 'lowdb';
import { JSONFile } from "lowdb/node";
import { userRouter } from './routers/users.router.js';
import { mainErrorHandler, noRouteHandler } from './middlewares/errorHandler.middleware.js';

//setup environment vairables
process.NODE_ENV === 'production'
    ? dotenv.config({ path: './config/production.env' })
    : dotenv.config({path: './config/development.env'})

//create app
const app = express();
// dotenv.config();

//lowdb database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
//set initial db
db.data = db.data || { users: [] };


//core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

//http://localhost:5000/users GET

//routers
app.use('/users', userRouter);


//error handler undefined routes
app.use(noRouteHandler);
//main error handler
app.use(mainErrorHandler);

console.log('email', process.env.EMAIL, 'dbPassword', process.env.PASS);

//port
const port = process.env.PORT;
app.listen(port, console.log(`server is up on port: ${port}. 👻`));
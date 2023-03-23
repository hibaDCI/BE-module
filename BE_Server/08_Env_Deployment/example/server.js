import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import { userRouter } from './routers/users.router.js';
import { mainErrorHandler, noRouteHandler } from './middlewares/errorHandler.middleware.js';
import { env } from './config/environment.js';


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

//http://localhost:5000/users GET

//routers
app.use('/users', userRouter);


//error handler undefined routes
app.use(noRouteHandler);
//main error handler
app.use(mainErrorHandler);




//port
const port = env.port;
app.listen(port, console.log(`server is up on port: ${port}. 👻`));
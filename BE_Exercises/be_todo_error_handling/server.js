import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { userRouter } from './routers/user.router.js';
import { todoRouter } from './routers/todos.router.js';
import { genericErrHandler, noRoute } from './middlewares/err.handler.js';


//create app
const app = express();


//database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();
db.data = db.data || {users:[], todos:[]}

//apply core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));


//apply routers
app.use('/users', userRouter);
app.use('/todos', todoRouter);


//error handler middlewares
app.use(noRoute);
app.use(genericErrHandler);

//port
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server is up on port: ${port} 👻`));
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { userRouter } from './routers/user.router.js';
// import { todoRouter } from './routers/todos.router.js';
import { genericErrHandler, noRoute } from './middlewares/err.handler.js';
import { connectToDB } from './utils/db.js';

//set environment variables
process.NODE_ENV === 'production'
    ? dotenv.config({ path: './config/production.env' })
    : dotenv.config({ path: './config/development.env' });

//create app
const app = express();

console.log(process.NODE_ENV==='production'?'production':"development");

//database
connectToDB();



//apply core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));


//apply routers
app.use('/users', userRouter);
// app.use('/todos', todoRouter);


//error handler middlewares
app.use(noRoute);
app.use(genericErrHandler);

//port
const port = process.env.PORT;
app.listen(port, console.log(`Server is up on port: ${port} 🆗`));
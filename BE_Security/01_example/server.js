import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDB } from './utils/db.js';
import { genericErrHandler, noRoute } from './middlewares/err.handler.js';
import userRouter from './routers/users.js';
import productRouter from './routers/products.js';
import cartRouter from './routers/users.js';


//set environment variables
process.NODE_ENV === 'production'
    ? dotenv.config({ path: './config/production.env' })
    : dotenv.config({ path: './config/development.env' });

//create app
const app = express();

//database
connectToDB();



//apply core middlewares
app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true, methods: ['GET', 'POST', 'PUT', "DELETE"]}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

//apply routers
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);


//error handler middlewares
app.use(noRoute);
app.use(genericErrHandler);


//port
const port = process.env.PORT;
app.listen(port, console.log(`✅ Server is running at http://localhost:${port}/`));
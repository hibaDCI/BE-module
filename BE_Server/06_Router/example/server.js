import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Low, JSONFile } from 'lowdb';
import userRouter from './routers/users.router.js';
import { productRouter } from './routers/products.router.js';



//create the app
const app = express();

//create database
const adapter = new JSONFile('db.json');
export const db = new Low(adapter);
await db.read();

//set initial data in db
db.data ||= {products: [], users:[]}


//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
//using routers
app.use('/users', userRouter);
app.use('/products', productRouter);








const port = 5000;
app.listen(port, console.log(`Server is up on port ${port} 👻`));
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { mainErrHandler, notFoundMW } from './middlewares/err.middleware.js';
import { recordRouter } from './routers/records.router.js';
import { conToDB } from './utils/db.js';


//include env file
process.NODE_ENV === 'production'
    ? dotenv.config({ path: './config/production.env' })
    : dotenv.config({ path: './config/development.env' });


//create server
const app = express();

//connect to db
conToDB()

//apply core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));


//add routers
app.use('/api', recordRouter);


//error Handlers
app.use(notFoundMW);
app.use(mainErrHandler);

const port = process.env.PORT;
app.listen(port, console.log(`Server is up on port: ${port} 👻`));
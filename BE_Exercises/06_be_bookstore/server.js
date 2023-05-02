import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { genericErrHandler, noRoute } from "./middlewares/errors.js";
import { connectToDB } from "./utils/db.js";

import booksRouter from './routers/books.js';
import reviewsRouter from './routers/reviews.js';
import authorsRouter from './routers/authors.js';


//set environment variables
process.NODE_ENV === "production"
  ? dotenv.config({ path: "./config/production.env" })
  : dotenv.config({ path: "./config/development.env" });

//create app
const app = express();

console.log(process.NODE_ENV === "production" ? "production" : "development");

//database
await connectToDB();

//apply core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//apply routers
app.use("/books", booksRouter);
app.use("/reviews", reviewsRouter);
app.use("/authors", authorsRouter);


//error handler middlewares
app.use(noRoute);
app.use(genericErrHandler);

//port
const port = process.env.PORT;
app.listen(port, console.log(`Server is up on: ${port} \n-----------\n`));

import mongoose from "mongoose";
import { addSampleData } from "./seed.js";

//to connect to mongo Atlas
export async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connection Established! 😃");

    //seed
    addSampleData(100);

    //alternative for try..catch to catch the errors
    // mongoose.connection.on('error', (err)=>{console.log(err.message)})
  } catch (error) {
    console.error(error.message);
  }
}

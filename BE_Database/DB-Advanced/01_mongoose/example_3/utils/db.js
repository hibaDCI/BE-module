import mongoose from "mongoose";
import { seedUsers } from "./seeds.js";

//to connect to mongo Atlas
export async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connection Established! 😃");

    
    //alternative for try..catch to catch the errors
    // mongoose.connection.on('error', (err)=>{console.log(err.message)})

    //seeding user
    seedUsers(100)
  } catch (error) {
    console.error(error.message);
  }
}

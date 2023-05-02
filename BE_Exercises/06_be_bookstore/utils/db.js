import mongoose from "mongoose";
import { addSampleData } from "./seed.js";

//to connect to mongo Atlas
export async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connection Established! 😃");

    //seed
    // await addSampleData(100);

  } catch (error) {
    console.error(error.message);
  }
}

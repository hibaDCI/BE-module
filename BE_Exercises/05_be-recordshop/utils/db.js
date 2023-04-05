import mongoose from 'mongoose';
import { seedAlbums } from './seeds.js';

export const conToDB = async () => {
    try {
        //create a connection to db
        await mongoose.connect( process.env.DB );
        console.log('DB connection established ✅');

        //add sample data
        seedAlbums(100);


    } catch (error) {
        console.log(error.message);
    }
}
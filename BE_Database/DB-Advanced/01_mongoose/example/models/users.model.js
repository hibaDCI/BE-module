import mongoose from 'mongoose';

//create schema for users
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 3
    },
    lastname: {
        type: String,
        minLength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    }

});


//generate model
export default mongoose.model('User', userSchema);
import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required!']
    },

    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: [true, 'This email already in use!']
    }
});


export const User = model('User', userSchema);
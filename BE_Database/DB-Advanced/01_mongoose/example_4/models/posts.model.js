import mongoose, { Schema, model } from "mongoose";


const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required!']
    },

    content: {
        type: String,
        required: [true, 'content is required!']
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'author is required!']
    },

    likes: {
        type: Number,
        default: 0,
        min: 0
    },

});


export const Post = model('Post', postSchema);
import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'content field is required!']
    },

    create_at: {
        type: Date,
        default: Date.now()
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'author field is required!']
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'post field is required!']
    }
});

export const Comment = model('Comment', commentSchema);
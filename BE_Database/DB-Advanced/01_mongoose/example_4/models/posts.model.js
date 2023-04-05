import mongoose, {Schema, model} from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: [true, "title is a required field!"] },
  content: { type: String, required: [true, "content is a required field!"] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export const Post = model('Post', postSchema);
import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: [true, "content is a required field!"] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

export default model("Comment", commentSchema);

import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  name: {type: String, required: [true, "name is a required field!"]},
  email: {
    type: String,
    required: [true, "email is a required field!"],
    unique: [true, "This email already in use!"],
  },
});

//generate model
export const User = model("User", userSchema);

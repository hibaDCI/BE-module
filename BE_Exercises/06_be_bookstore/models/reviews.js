import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is a required field"],
    unique: [true, "Username is a unique field"],
  },

  text: {
    type: String,
    required: [true, "Text for review is a required field"],
  },

  date: {
    type: Date,
    required: [true, "Date of review is a required field"],
    default: Date.now(),
  },

  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book is a required field"],
  },
});

export const Review = model("Review", reviewSchema);

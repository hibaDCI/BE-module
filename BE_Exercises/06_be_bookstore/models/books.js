import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is a required field"],
  },

  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  ],

  publish_date: {
    type: Date,
  },

  genre: {
    type: String,
    enum: [
      "fantasy",
      "romance",
      "sience-fiction",
      "mystery",
      "horror",
      "thriller",
      "historical-fiction",
    ],
    required: [true, "Genre is a required field"],
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, "Price is a required field"],
    min: 0,
  },
});


export const Book = model("Book", bookSchema);

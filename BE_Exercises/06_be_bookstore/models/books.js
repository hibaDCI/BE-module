import { Schema, model } from "mongoose";
import { Author } from './authors.js';
import createError from 'http-errors';

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
      "self-learning",
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

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});


bookSchema.pre('save', async function (next) {
  try {
    const { authors } = this._req.body;
    let author;
    switch (true) {
      //author as a single id
      case typeof authors === 'string':
        author = await Author.findById(author)
        if (!author) {
          throw createError('Given authorid is invalid!')
        }
        
        this.authors.push(author._id);
        break;
      
      //authors as an array of ids
      case Array.isArray(authors):
        for (let aId of authors) {
          author = await Author.findById(aId);
          if (!author) {
            throw createError('One of given author ids is invalid!')
          }

          this.authors.push(author._id);
        }
        break;
      
      //author as an object
      case typeof authors === 'object'
        && !Array.isArray(authors):

        
    
      default:
        break;
    }
    //get author from req
    //what is author
        //array of ids
        //new author object
    //push authors to book.authors
  } catch (error) {
    next(error)
  }
})

export const Book = model("Book", bookSchema);

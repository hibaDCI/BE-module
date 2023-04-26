import { body } from "express-validator";
import { Author } from "../models/authors.js";
import { Book } from "../models/books.js";

//custom validator to verify authors ids
const verifyAuthorsIds = async (authorid) => {
  const author = await Author.findById(authorid);
  if (!author) {
    throw new Error("Invalid author ID");
  }
  return true;
};

//!check this again
//custom validator to find duplicate books
const duplicateBooks = async (title) => {
  const book = await Book.findOne({ title });
  if (book) {
    console.log("this is duplicate");
    return Promise.reject("Duplicate book!");
  }
};

//custom sanitizer for price
const normalizePrice = (price) => {
  return Number(parseFloat(price).toFixed(2));
};

//custom sanitizer for rating
const normalizeRating = (rating) => {
  return Number(rating.toFixed(1));
};

//custom sanitizer for genre
const normalizeGenre = (genre) => {
  return genre.toLowerCase().replace("_", "-");
};

export const bookValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required!")
    .escape()
    .custom(duplicateBooks),

  body("authors")
    .isArray()
    .withMessage("Please provide list of authors as an array!"),

  body("authors.*")
    .trim()
    .isMongoId()
    .withMessage("Please provide ObjectIds for authors")
    .custom(verifyAuthorsIds),

  body("publish_date")
    .trim()
    .isDate()
    .withMessage("Please provide date for publish_date")
    .escape(),

  body("genre")
    .trim()
    .escape()
    .customSanitizer(normalizeGenre)
    .notEmpty()
    .withMessage("Genre is a required!")
    .isIn([
      "fantasy",
      "romance",
      "sience-fiction",
      "mystery",
      "horror",
      "thriller",
      "historical-fiction",
      "self-learning",
    ])
    .withMessage("Please use one of standard values for Genre!"),

  body("description").trim().escape(),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required!")
    .isFloat({ min: 0 })
    .withMessage("Please provide valid price")
    .customSanitizer(normalizePrice)
    .escape(),

  body("rating")
    .trim()
    .custom(normalizeRating)
    .isFloat({ min: 0, max: 5 })
    .withMessage("Please provide valid rating 0-5")
    .escape(),
];

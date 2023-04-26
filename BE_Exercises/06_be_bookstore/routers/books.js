import express from 'express';
const router = express.Router();
import {
  getAllBooks,
  addNewBook,
  getBookWithReveiwsById,
  updateBookById,
  deleteBookById,
  getBooksPopulateAuthors,
  getPopularBooks,
  getTop5ExpBooks,
  getSecondTop5ExpBooks,
} from "../controllers/books.js";
import { bookValidations } from '../validations/books.js';
import {validate} from '../validations/validator.js'


router.route('/')
    .get(getAllBooks)
    .post(validate(bookValidations),addNewBook);

router.route("/authors")
    .get(getBooksPopulateAuthors);

router.route("/popular")
    .get(getPopularBooks)

router.route('/topfive')
    .get(getTop5ExpBooks)

router.route("/sectopfive")
    .get(getSecondTop5ExpBooks);

router.route('/:bid')
    .get(getBookWithReveiwsById)
    .put(updateBookById)
    .delete(deleteBookById)


export default router;
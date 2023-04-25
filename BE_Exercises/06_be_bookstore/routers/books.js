import express from 'express';
const router = express.Router();
import {getAllBooks, addNewBook, getBookWithReveiwsById, updateBookById, deleteBookById, getBooksPopulateAuthors} from '../controllers/books.js'


router.route('/')
    .get(getAllBooks)
    .post(addNewBook);

router.route("/authors")
    .get(getBooksPopulateAuthors);

router.route('/:bid')
    .get(getBookWithReveiwsById)
    .put(updateBookById)
    .delete(deleteBookById)


export default router;
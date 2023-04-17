import express from 'express';
const router = express.Router();
import {getAllBooks, addNewBook, getBookWithReveiwsById, updateBookById, deleteBookById} from '../controllers/books.js'


router.route('/')
    .get(getAllBooks)
    .post(addNewBook);

router.route('/:bid')
    .get(getBookWithReveiwsById)
    .put(updateBookById)
    .delete(deleteBookById)


export default router;
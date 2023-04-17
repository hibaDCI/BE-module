import { Book } from '../models/books.js';
import { Review } from "../models/reviews.js";
import createError from 'http-errors';

//get all books
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            message: 'list of all books',
            books
        });

    } catch (error) {
        next(error);
    }
}


//get single book with all related reviews
export const getBookWithReveiwsById = async (req, res, next) => {
    try {

        const bookid = req.params.bid;
        const book = await Book.findById(bookid);

        if (!book) {
            throw createError.NotFound('There is no book for given bookid');
        }
    
        //find all related reviews
        const reviews = await Review.find({ book: bookid })
        
        res.status(200).json({
            message: "Book info + all related reivews",
            book, reviews
        })

    } catch (error) {
        next(error);
    }
}


//add new book
export const addNewBook = async (req, res, next) => {
    try {
        //1. read book's data from req.body
        const { title, author, publish_date, genre, description, price } = req.body;

        //2. check the required fields if exist
        if (!title || !author || !genre || !price) {
            throw createError(400, 'Some of the required fields are missed!');
        }

        //3. create the book using Book model
        const newBook = await Book.create({ title, author, publish_date, genre, description, price });

        //4. send response
        res.status(201).json({
            message: 'New Book added!',
            newBook
        });

    } catch (error) {
        next(error);
    }
}


//update a book by id
export const updateBookById = async (req, res, next) => {
    try {
        //1. check if the given book id is valid
        const bookid = req.params.bid;
        const book = await Book.findById(bookid);

        if (!book) {
            throw createError.NotFound('There is no book for given bookid');
        }

        //2. read new data from req.body
        
        //3. update the book with given id
        const updateResult = await Book.findByIdAndUpdate(
                                            bookid,
                                            { ...req.body },
                                            { runValidators: true, new: true });

        //4. send response
        res.status(200).json({
            message: 'Book updated successfully!',
            book: updateResult
        });

    } catch (error) {
        next(error);
    }
}


//delete a book by id
export const deleteBookById = async (req, res, next) => {
    try {
        //1. validate bookid
        const bookid = req.params.bid;
        const book = await Book.findById(bookid);

        if (!book) {
          throw createError.NotFound("There is no book for given bookid");
        }

        //2. check if there is any review with given bookid and delete them
        const result_review_delete = await Review.deleteMany({ book: book._id });

        //3. delete the book 
        const result_book_delete = await Book.findByIdAndRemove(book._id)

        //4. send response
        res.status(200).json({
            message: "Book with given id deleted!",
            book: result_book_delete,
            reviews: result_review_delete
        })

    } catch (error) {
        next(error);
    }
}
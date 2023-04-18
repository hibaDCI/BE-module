import { Book } from "../models/books.js";
import { Review } from "../models/reviews.js";
import createError from 'http-errors';

//get all reviews
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      message: "list of all reviews",
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

//add new review for a specific book using bid
export const addNewReview = async (req, res, next) => {
  try {
    const bookid = req.params.bid;
    const { username, text, date } = req.body;

    if (!username || !text) {
      throw createError(400, 'some of required fields are missing!')
    }

    const book = await Book.findById(bookid);
    if (!book) {
      throw createError.NotFound('There is no book with given bookid!');
    }
    
    const newReview = await Review.create({ username, text, date, book: book._id });
    res.status(201).json({
      message: 'new review added!',
      review: newReview
    })

  } catch (error) {
    next(error);
  }
};

//get a single review by using review id
export const getReviewById = async (req, res, next) => {
  try {
    const { rid } = req.params;
    const review = await Review.findById(rid);
    if (!review) {
      throw createError.NotFound('There is no review for given reviewid!');
    }

    res.status(200).json({
      message: "get single review by reviewid",
      review
    })
  } catch (error) {
    next(error);
  }
};

//update a review by id
export const updateReviewById = async (req, res, next) => {
  try {
    const { rid } = req.params;
    const review = await Review.findById(rid);
    if (!review) {
      throw createError.NotFound("There is no review for given reviewid!");
    }
    
    const updatedReivew = await Review.findByIdAndUpdate(rid, { ...req.body }, { runValidators: true, new: true });
    res.status(200).json({
      message: 'document updated successfully!',
      updatedReivew
    })

  } catch (error) {
    next(error);
  }
};

//delete a review by id
export const deleteReviewById = async (req, res, next) => {
  try {

    const { rid } = req.params;
    const review = await Review.findById(rid);
    if (!review) {
      throw createError.NotFound("There is no review for given reviewid!");
    }

    const deleted_review = await Review.findByIdAndRemove(rid);
    res.status(200).json({
      message: "review is removed",
      deleted_review
    })

  } catch (error) {
    next(error);
  }
};

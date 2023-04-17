import express from "express";
const router = express.Router();
import { getAllReviews, addNewReview, getReviewById, updateReviewById, deleteReviewById } from '../controllers/reviews.js';

router.route('/')
    .get(getAllReviews)


router.route('/books/:bid')
    .post(addNewReview)


router.route('/:rid')
    .get(getReviewById)
    .put(updateReviewById)
    .delete(deleteReviewById)

export default router;

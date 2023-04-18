import express from "express";
import { addPost, allPostOfUser, allPostWithTheirAuthor, deletePostById, getAllPostsByAuthors, getPostByIdPlusAuthor } from "../controllers/posts.controller.js";
export const postRouter = express.Router();


postRouter.route("/users/:uid")
    .post(addPost)
    .get(allPostOfUser);


postRouter.route('/')
    .get(allPostWithTheirAuthor);


postRouter.route('/:pid')
    .get(getPostByIdPlusAuthor)
    .delete(deletePostById)

postRouter.route("/authors/:authors").get(getAllPostsByAuthors);
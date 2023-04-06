import express from "express";
import { addPost, allPostOfUser, allPostWithTheirAuthor } from "../controllers/posts.controller.js";
export const postRouter = express.Router();


postRouter.route("/users/:uid")
    .post(addPost)
    .get(allPostOfUser);


postRouter.route('/')
    .get(allPostWithTheirAuthor)
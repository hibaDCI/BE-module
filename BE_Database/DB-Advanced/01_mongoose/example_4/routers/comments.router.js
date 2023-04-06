import express from "express";
import { addComment, allComForSinglePost, allCommentForPost } from "../controllers/comments.controller.js";
export const commentRouter = express.Router();


commentRouter
  .route("/users/:uid/posts/:pid")
  .post(addComment)
  .get(allCommentForPost);

commentRouter.route("/posts/:pid")
    .get(allComForSinglePost);
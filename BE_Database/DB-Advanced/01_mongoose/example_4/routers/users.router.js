import express from 'express';
import { addNewUser, getAllUsers } from '../controllers/users.controller.js';
import { addNewPost, getAllPosts } from '../controllers/posts.controller.js';

export const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(addNewUser);

userRouter.route('/:uid/posts')
    .get(getAllPosts)
    .post(addNewPost);

// userRouter.route('/:uid')
    // .get(getUserById)
    // .put(updateUser)
    // .delete(deleteUser);
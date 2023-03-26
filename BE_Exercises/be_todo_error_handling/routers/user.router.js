import express from 'express';
import {
    addNewUser, deleteUser,
    getAllUsers, getUserById, updateUser
} from '../controllers/users.controller.js';
import { validateUser } from '../middlewares/data.validation.js';

export const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUsers)
    .post(validateUser, addNewUser);

userRouter.route('/:uid')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
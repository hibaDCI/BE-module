import express from 'express';
import { addUser, allUsers, getProfile } from '../controllers/users.controller.js';
export const userRouter = express.Router();


userRouter.route('/')
    .post(addUser)
    .get(allUsers)

userRouter.route('/:uid')
    .get(getProfile)


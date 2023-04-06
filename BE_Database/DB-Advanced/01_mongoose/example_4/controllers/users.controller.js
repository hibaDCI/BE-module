import createError from "http-errors";
import { User } from "../models/users.model.js"

//POST /users
export const addUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const newUser = await User.create({ name, email });
        res.status(201).json({
            message: 'user created!',
            newUser
        })

    } catch (error) {
        next(error)
    }
}


// GET /users/:uid
export const getProfile = async (req, res, next) => {
    try {
        //read uid 
        const { uid } = req.params;
        
        //find the user
        const user = await User.findById(uid);

        //return error if there is no user
        if (!user) {
            throw createError.NotFound('The uid in params is invalid')
        }

        //send response
        res.status(200).json({
            message: 'fetch data successfully!',
            user
        })

    } catch (error) {
        next(error)
    }
}






export const allUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            messag: "list of all users",
            users
        })
    } catch (error) {
        next(error)
    }
}
import { Address, User } from '../models/users.js';
import { Product } from '../models/products.js';
import { Cart } from '../models/carts.js';
import createError from 'http-errors';
import { validationResult } from 'express-validator';

// POST /users/signup
export const signup = async (req, res, next) => {
    try {

        // destructure and check required fields
        const { name, birthdate, email, password, role, address } = req.body;
        if (!name || !birthdate || !email || !password || !address) {
            throw createError(400, 'Some of required fields are missed!')
        }

        //create new address
        const newAddress = await Address.create(address);
        if (!newAddress) {
            throw createError(400, 'Something in your address is not correct!');
        }
        //create new user
        const newUser = await User.create({
            name, birthdate, email, password, address: newAddress._id, role
        });
        
        //send response
        res.status(201).json({
            message: 'Signup successfully!',
            newUser
        })
    } catch (error) {
        next(error)
    }
}


// POST /users/login
export const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}


// GET /users/:uid/cart
export const getUserCart = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}


// GET /users/:uid/orders
export const getUserOrders = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
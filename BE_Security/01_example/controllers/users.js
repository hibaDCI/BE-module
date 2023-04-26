import { Address, User } from '../models/users.js';
import { Product } from '../models/products.js';
import { Cart } from '../models/carts.js';
import createError from 'http-errors';

// POST /users/signup
export const signup = async (req, res, next) => {
    try {
        console.log('controller')
       

        // destructure and check required fields
        const { name, birthdate, email, password, role, address } = req.body;

        //create new address
        const newAddress = await Address.create(address);
        if (!newAddress) {
            throw createError(400, 'Something in your address is not correct!');
        }
        //create new user
        const newUser = await User.create({
            name, birthdate, email, password, address: newAddress._id, role
        });

        //remove password from newUser before sending to frontend
        newUser.password = undefined;
        
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
        const { email, password } = req.body;

        //1. find a user with given email address
        const user = await User.findOne({ email });

        //2. if no user return response 404
        if (!user) {
            return res.status(403).json({
                message: "Login failed! Email or Password is wrong."
            })
        }
        //3. if there is a user compare the password
        if (await user.isPasswordMatch(password, user.password)) {
            //4. send response
            res.status(200).json({
                message: 'Congrats! You logged in successfully!'
            })
        } else {
            throw createError(403, "Login failed! Email or Password is wrong")
        }
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
import express from 'express';
import { signup, signin, getUserCart, getUserOrders, updateUser } from '../controllers/users.js'
import { validate } from '../validation/validator.js';
import { userValidationLogin, usersValidations } from '../validation/users.js';
const router = express.Router();

//register users
router.route('/signup').post(validate(usersValidations), signup);


//authenticate users
router.route('/signin').post(validate(userValidationLogin),signin);

//update user
router.route('/:uid')
    .put(updateUser)
//get cart
router.route('/:uid/cart')
    .get(getUserCart)

//get orders
router.route('/:uid/orders')
    .get(getUserOrders)

export default router;
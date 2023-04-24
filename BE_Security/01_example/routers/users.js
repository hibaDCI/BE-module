import express from 'express';
import {signup, login, getUserCart, getUserOrders} from '../controllers/users.js'
const router = express.Router();

//register users
router.route('/signup').post(signup);

//authenticate users
router.route('/login').post(login);

//get cart
router.route('/:uid/cart')
    .get(getUserCart)

//get orders
router.route('/:uid/orders')
    .get(getUserOrders)

export default router;
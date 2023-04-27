import express from "express";
import { getProductList, addNewProduct, updateProduct, deleteProduct } from "../controllers/products.js";
import { validate } from '../validation/validator.js';
import { productValidations } from "../validation/products.js";
import { authToken } from '../middlewares/jwt.js';
const router = express.Router();

router.route('/')
    .get(authToken(), getProductList)
    .post(validate(productValidations), addNewProduct)

router.route('/:pid')
    .put(updateProduct)
    .delete(deleteProduct)


export default router;

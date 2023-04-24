import express from "express";
const router = express.Router();
import { getProductList, addNewProduct, updateProduct, deleteProduct } from "../controllers/products.js";

router.route('/')
    .get(getProductList)
    .post(addNewProduct)

router.route('/:pid')
    .put(updateProduct)
    .delete(deleteProduct)


export default router;

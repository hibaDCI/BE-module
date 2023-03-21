import express from 'express';
import { addNewProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/products.controller.js';
export const productRouter = express.Router();

/** PRODUCT ROUTES */
//get All Products      GET     /products/
// productRouter.get('/', getAllProducts);
//add New Product       POST    /products/
// productRouter.post('/', addNewProduct);

//chain the methods
productRouter.route('/')
    .get(getAllProducts)
    .post(addNewProduct);

//update product        PUT     /products/:pid
//delete product        DELETE  /products/:pid
productRouter.route('/:pid')
    .put(updateProduct)
    .delete(deleteProduct);
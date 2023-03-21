import { db } from '../server.js';

/* ---------------------------------------------------------------- */
/*                         get all products                         */
/* ---------------------------------------------------------------- */
export const getAllProducts = async (req, res) => {
    res.json({ products: db.data.products })
};


/* ---------------------------------------------------------------- */
/*                          add new product                         */
/* ---------------------------------------------------------------- */
export const addNewProduct = async (req, res) => {
    //{title:'product', price: 323, desc: 'sdlfkjsdfsd', id: 1}
    let newProduct = { ...req.body, id: db.data.products.slice(-1)[0]?.id + 1 || 1 };
    
    if (!newProduct.title || !newProduct.price) {
        return res.status(400).json({ message: "some of required fields are missed. 😠" });
    }

    db.data.products.push(newProduct);
    await db.write();
    res.status(200).json({ message: 'product added 😀', product: newProduct });
}


/* ---------------------------------------------------------------- */
/*                          update product                          */
/* ---------------------------------------------------------------- */
// Todo: write the body of this controller to update product with given pid
export const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.pid);

    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid productId in URL. 🙀' });
    }

    let productIndex = db.data.products.findIndex(p => p.id === productId);
    db.data.products[productIndex] = {
      ...db.data.products[productIndex],
      ...req.body,
    };
    
    await db.write()
    res
      .status(200)
      .send({
        message: "updated successfull!😀",
        product: db.data.products[productIndex]
      });
}


/* ---------------------------------------------------------------- */
/*                          delete product                          */
/* ---------------------------------------------------------------- */
export const deleteProduct = async (req, res) => {
    const productid = parseInt(req.params.pid);
    
    if (isNaN(productid)) {
        return res.status(400).json({ message: 'The product id supposed to be a number 🤔' });
    }

    const productIndex = db.data.products.findIndex(p => p.id === productid);
    if(productIndex === -1){
        return res.status(404).json({ message: "The product doesnt exist. 😒" });
    }

    db.data.products.splice(productIndex, 1);
    await db.write()
    res.send({ message: 'product deleted 😀', products: db.data.products });
}
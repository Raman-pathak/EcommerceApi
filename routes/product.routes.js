const express = require('express');
const {
    addproduct,
    getAllProducts,
    getProductDetails,
    getCategoryByID,
    updateProduct,
    deleteProduct
} = require('../controller/product.controller');
const { rateLimit } = require('../middleware/ratelimitter');
const productRouter = express.Router()

//Add New Product

productRouter.post('/create', addproduct)

// Get All Products

productRouter.get('/get', rateLimit, getAllProducts)

//Get Particular Product by ProductID

productRouter.get('/get/:productID', getProductDetails)

//Get Product by CategoryID
productRouter.get('/get/category/:categoryID', getCategoryByID)

//Update the Product

productRouter.put('/update/:productID', updateProduct)

//Delete the Product

productRouter.delete('/delete/:productID', deleteProduct)

module.exports = { productRouter }

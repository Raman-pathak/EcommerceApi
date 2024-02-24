// get all products

const { categoryModel } = require("../models/category.model")
const { productModel } = require("../models/product.model")

// get all Products
const getAllProducts = async (req, res) => {
    try {
        const data = await productModel.find().populate('category')
        if (!data || data.length == 0) {
            return res.status(404).json({ msg: "Product Not Found", success: false })
        }

        return res.status(200).json({
            success: true,
            msg: "All products retrieved succesfully",
            data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

//get Product Details by Product ID
const getProductDetails = async (req, res) => {
    try {
        const { productID } = req.params
        const singleProduct = await productModel.findById(productID)

        if (!singleProduct) {
            return res.status(404).json({ msg: "Product Not Found Invalid Product ID", success: false })
        }
        return res.status(200).json({
            success: true,
            msg: "product retrieved succesfully",
            data: singleProduct
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

// Add new Product
const addproduct = async (req, res) => {
    try {
        const { title, price, image, description, availability, categoryID } = req.body
        let category = await categoryModel.findById(categoryID)
        if (!category) {
            return res.status(404).json({ msg: "Category not Found", success: false })
        }
        const isProductPresent = await productModel.findOne({ title })
        if (isProductPresent) {
            return res.status(400).json({ msg: "Cannot Add Multiple Products with Same Title", success: false })
        }
        const newProduct = new productModel({
            title,
            price,
            image,
            description,
            availability,
            category: categoryID
        })
        await newProduct.save()
        return res.status(201).json({ msg: 'Product Added Succesfully', success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

// get Product by category ID
const getCategoryByID = async (req, res) => {
    try {
        const { categoryID } = req.params
        const category = await productModel.find({ category: categoryID }).populate('category')
        if (!category || category.length == 0) {
            return res.status(404).json({ msg: "Category Not Found", success: false })
        }
        return res.status(200).json({ data: category, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

// Update the Product
const updateProduct = async (req, res) => {
    try {
        const { title, price, image, description, availability, categoryID } = req.body
        const { productID } = req.params
        const UpdatedValues = {
            title,
            price,
            image,
            description,
            availability,
            category: categoryID
        }
        const updatedProduct = await productModel.findByIdAndUpdate(productID, UpdatedValues, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product Not Found", success: false })
        }
        return res.status(200).json({ msg: "Product Updated Succesfully", success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

//delete the product
const deleteProduct = async (req, res) => {
    try {
        const { productID } = req.params
        const productDelete = await productModel.findByIdAndDelete(productID)
        if (!productDelete) {
            return res.status(404).json({ msg: "Product Not Found", success: false })
        }
        return res.status(200).json({ msg: "Product Deleted Succesfully", success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}
module.exports = {
    getAllProducts,
    getProductDetails,
    addproduct,
    getCategoryByID,
    updateProduct,
    deleteProduct
}

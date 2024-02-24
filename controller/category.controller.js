const { categoryModel ,} = require("../models/category.model")

//Add New Category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body
        const newCategory = new categoryModel({ name })
        await newCategory.save()
        return res.status(201).json({ msg: "Category Added Succesfully", data: newCategory, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

//Get All Categories
const getAllCategory = async (req, res) => {
    try {
        const data = await categoryModel.find()
        if (!data || data.length == 0) {
            return res.status(404).json({ msg: 'Category Not Found', success: false })
        }
        return res.status(200).json({ data, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

//Get Category By CategoryID
const getCategoryByID = async (req, res) => {
    try {
        const { categoryID } = req.params
        const data = await categoryModel.findById(categoryID)
        if (!data) {
            return res.status(404).json({ msg: "Category Not Found", success: false })
        }
        return res.status(200).json({ data, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

// Update the Category
const updateCategory = async (req, res) => {
    try {
        const { categoryID } = req.params
        const { name } = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryID, { name }, { new: true })
        if (!updatedCategory) {
            return res.status(404).json({ msg: "Category Not Found", success: false })
        }
        return res.status(200).json({ msg: "Category Updated Succesfully", data: updatedCategory, success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}

//Delete the Category
const deleteCategory = async (req, res) => {
    try {
        const { categoryID } = req.params

        const deletedCategory = categoryModel.findByIdAndDelete(categoryID)
        if (!deletedCategory) {
            return res.status(404).json({ msg: "Category Not Found", success: false })
        }
        return res.status(200).json({ msg: "Category Deleted Succesfully" })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            msg: error.message
        })
    }
}
module.exports = {
    addCategory,
    getAllCategory,
    getCategoryByID,
    updateCategory,
    deleteCategory
}
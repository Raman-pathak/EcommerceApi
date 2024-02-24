const express = require('express');
const { addCategory, getAllCategory, getCategoryByID, updateCategory, deleteCategory } = require('../controller/category.controller');
const categoryRouter = express.Router()

// create New Category
categoryRouter.post('/create', addCategory)

// Get All Category
categoryRouter.get('/get', getAllCategory)

// Get Category by ID (categoryID)
categoryRouter.get('/get/:categoryID/particular', getCategoryByID)

// Update Category by CategoryID
categoryRouter.put('/update/:categoryID', updateCategory)

//Delete Category by CategoryID
categoryRouter.delete('/delete/:categoryID', deleteCategory)

module.exports = { categoryRouter }
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    price: Number,
    description: String,
    availability: Boolean,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

module.exports.productModel = mongoose.model('Product', productSchema);
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    catslug: { type: String, required: true, unique: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    subimage1: { type: String, required: true },
    subimage2: { type: String, required: true },
    subimage3: { type: String, required: true }
})

const Product = mongoose.model("product_collections", productSchema)

module.exports = Product
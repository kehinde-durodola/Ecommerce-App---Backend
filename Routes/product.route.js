const express = require("express")
const productrouter = express.Router()
const { uploadProduct, getAllProducts, getProductBySlug, getProductByCategory, getProductByCatSlug, deleteProduct } = require("../Controllers/product.controller")

productrouter.post("/upload", uploadProduct)
productrouter.get("/list", getAllProducts)
productrouter.get("/:slug", getProductBySlug)
productrouter.get("/category/:category", getProductByCategory)
productrouter.get("/catslug/:catslug", getProductByCatSlug)
productrouter.delete("/delete/:productid", deleteProduct)


module.exports = productrouter
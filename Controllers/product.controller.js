const Product = require("../Models/product.model")
const uploadToCloudinary = require("../Utils/cloudinary")
const jwt = require("jsonwebtoken")
const { slugify, slugifyCategory } = require("../Helpers/slugify")

const secretKey = process.env.JWT_SECRET_KEY;

const uploadProduct = async (req, res) => {
    const { title, price, stock, category, details, image, subimage1, subimage2, subimage3 } = req.body

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No or Invalid Token Provided" })
    }

    const token = authHeader.split(" ")[1]
    const slug = slugify(title)
    const catslug = slugifyCategory(category)

    try {
        if (!title || !price || !stock || !category || !details || !image || !subimage1 || !subimage2 || !subimage3) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const verifyuser = jwt.verify(token, secretKey)

        if (!verifyuser || verifyuser.username !== process.env.ADMIN_USERNAME) {
            return res.status(401).json({ message: "Unathorized request" })
        }

        const [imageurl1, imageurl2, imageurl3, imageurl4] = await Promise.all([
            uploadToCloudinary(image),
            uploadToCloudinary(subimage1),
            uploadToCloudinary(subimage2),
            uploadToCloudinary(subimage3)
        ])

        await Product.create({
            title,
            slug,
            price,
            stock,
            category,
            catslug,
            details,
            image: imageurl1,
            subimage1: imageurl2,
            subimage2: imageurl3,
            subimage3: imageurl4,
        })

        res.status(201).json({ message: "Product uploaded successfully" })
    } catch (error) {
        console.error("Error uploading product:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error while fetching products" })
    }
}

const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const product = await Product.find({ category });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getProductByCatSlug = async (req, res) => {
    try {
        const { catslug } = req.params;

        const product = await Product.find({ catslug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteProduct = async (req, res) => {
    const { productid } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No or Invalid Token Provided" });
    }

    const token = authHeader.split(" ")[1];


    try {
        const verifyUser = jwt.verify(token, secretKey);


        if (verifyUser && verifyUser.username === process.env.ADMIN_USERNAME) {
            const deletedProduct = await Product.findByIdAndDelete(productid);

            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(403).json({ message: "Forbidden: Invalid Admin Credentials" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};


module.exports = { uploadProduct, getAllProducts, getProductBySlug, getProductByCategory, getProductByCatSlug, deleteProduct }
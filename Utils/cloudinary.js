const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SCERET
});

const uploadToCloudinary = async (base64Image, folder = "products") => {
    const res = await cloudinary.uploader.upload(base64Image, { folder });
    return res.secure_url;
};

module.exports = uploadToCloudinary;
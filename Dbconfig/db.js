const mongoose = require("mongoose")

const connectDb = async () => {
    const URI = process.env.DB_URI

    if (!URI) {
        throw new Error("DATABASE URI MISSING IN THE ENVIROMENT VARIABLE");
    }

    try {
        await mongoose.connect(URI)
        console.log("DATABASE CONNECTED SUCCESSFULLY");

    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDb
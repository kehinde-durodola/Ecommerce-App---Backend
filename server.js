const express = require("express")
const app = express()
require("dotenv").config()
const connectDb = require("./Dbconfig/db")
const cors = require("cors")
const productrouter = require("./Routes/product.route")
const adminrouter = require("./Routes/admin.route")

app.use(cors({ origin: "*" }))
app.use(express.json({ limit: "20mb" }));
app.use("/product", productrouter)
app.use("/admin", adminrouter)


connectDb()

const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    console.log(`APP STARTED ON PORT ${PORT}`);
})
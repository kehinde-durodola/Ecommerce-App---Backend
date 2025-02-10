const express = require("express")
adminrouter = express.Router()
const { adminLogin, verifyAdmin } = require("../Controllers/admin.controller")

adminrouter.post("/login", adminLogin)
adminrouter.get("/verify", verifyAdmin)

module.exports = adminrouter
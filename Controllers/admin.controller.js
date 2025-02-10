const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET_KEY;
const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD

const adminLogin = (req, res) => {
    const { username, password } = req.body

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" })
        }

        if (username !== adminUsername || password !== adminPassword) {
            return res.status(401).json({ message: "Invalid username or password" })
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: "1d" })

        return res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong. Please try again later." })
    }
}

const verifyAdmin = (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No or Invalid Token Provided" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const verifyUser = jwt.verify(token, secretKey)

        if (verifyUser && verifyUser.username === adminUsername) {
            res.status(200).json({ message: "Admin verified successfully" })
        } else {
            res.status(403).json({ message: "Forbidden: Invalid Admin Credentials" })
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token" })
    }

}

module.exports = { adminLogin, verifyAdmin }
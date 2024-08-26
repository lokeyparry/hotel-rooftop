const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // const token = req.headers['authorization']?.split(' ')[1];

        // Check if token is provided and valid
        if (!token) {
            return res.status(403).send({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(403).send({ message: "Token is not valid" });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
        next()

    } catch (error) {
        console.error("Error in veerify tokr=en", error);
        res.status(401).send({ message: "Invalid token" })
    }
}

module.exports = verifyToken;
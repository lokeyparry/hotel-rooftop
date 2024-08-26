// const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SECRET_KEY = process.env.JWT_SECRET_KEY
const generateToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("User not found")
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return token
    } catch (error) {
        console.error("Error generating token", error);
        throw error

    }
}

module.exports = generateToken;
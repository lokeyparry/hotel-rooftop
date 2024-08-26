const express = require('express')
const User = require('../models/user.model')
const generateToken = require('../middleware/generateToken')
    // const { verify } = require('jsonwebtoken')

const router = express.Router()

// User routes
router.post("/register", async(req, res) => {
        try {
            const { email, username, password } = req.body
            const user = new User({ email, username, password });
            await user.save()
            res.status(201).send({ message: "User registered successfully", user });
        } catch (error) {
            console.error("Failed to register");
            res.status(500).json({ message: "registration failed" })

        }
    })
    // login a user
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        }
        const isMatched = await user.comparePassword(password)
        if (!isMatched) {
            return res.status(401).send({
                message: "invalid credentials"
            })
        }
        const token = await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        })


        res.status(200).send({
            message: "login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })



    } catch (error) {
        console.error("Failed to login");
        res.status(500).json({ message: "login failed" })
    }
})

// logout a user

router.post("/logout", async(req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).send({ message: "logout successful" })
    } catch (error) {
        console.error("Failed to logout");
        res.status(500).json({ message: "logout failed" })
    }
})

// get all users

router.get("/users", async(req, res) => {
    try {
        const users = await User.find({}, 'id email role')
        res.status(200).send({ message: "users found successfully", users })
    } catch (error) {
        console.error("Failed to get all users");
        res.status(500).json({ message: "failed to get all users" })
    }
})

//delete user
router.delete("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        res.status(200).send({ message: "deleted successfully" })

    } catch (error) {
        console.error("Failed to delete users");
        res.status(500).json({ message: "failed to delete users" })
    }
})

// update a user role
router.put("/users/:id", async(req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body
        const user = await User.findByIdAndUpdate(id, { role }, { new: true })
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        res.status(200).send({ message: "updated successfully", user })
    } catch (error) {
        console.error("Error in Updating user role",
            error);
        res.status(500).json({ message: "Failed updating user Role" })
    }
})

module.exports = router
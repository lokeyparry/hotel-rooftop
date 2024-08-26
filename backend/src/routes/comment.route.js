const express = require('express')
const Comment = require('../models/comment.model')
const router = express.Router()

router.post("/post-comment", async(req, res) => {
    try {
        const newComment = new Comment({...req.body })
        await newComment.save()
        res.status(200).send({ comment: newComment })
    } catch (error) {
        console.log("Error in creating a comment.", error);
        res.status(500).json({ message: "Error in creating a comment" })
    }
})

router.get("/total-comment", async(req, res) => {
    try {
        const totalComment = await Comment.countDocuments({})
        res.status(200).send({ message: "Total comment count", totalComment })
    } catch (error) {
        console.log("Error in fetching a comment.", error);
        res.status(500).json({ message: "Error in fetching a comment" })
    }
})




module.exports = router;
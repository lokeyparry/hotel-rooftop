const express = require('express')
const Blog = require('../models/blog.model')
const Comment = require('../models/comment.model')
const verifyToken = require('../middleware/verifyToken')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()

router.post("/create-post", verifyToken, isAdmin, async(req, res) => {
    try {
        const newPost = new Blog({...req.body, author: req.userId })
        await newPost.save()
        res.status(200).send({
            message: "Post created successfully",
            post: newPost
        })

    } catch (error) {
        console.log("Error in creatinng a post.", error);
        res.status(500).json({ message: "Errror in craeteimg post" })

    }
})

router.get("/", async(req, res) => {
    try {
        const { search, category, location } = req.query
        let query = {}
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            }
        }
        if (category) {
            query = {
                ...query,
                category
            }
        }
        if (location) {
            query = {
                ...query,
                location
            }
        }

        const posts = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 })
        res.status(200).send(posts)
    } catch (error) {
        console.log("post are not found.", error);
        res.status(500).json({ message: "post not found" })
    }
})
router.get("/:id", async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Blog.findById(postId)
        if (!post) {
            return res.status(404).send({ message: "Post not found" })
        }
        // TODO fetch comment also
        const comments = await Comment.find({ postId: postId }).populate("user", "username email")
        res.status(200).send({ post, comments })
    } catch (error) {
        console.log("Error in fetching a post.", error);
        res.status(500).json({ message: "Error in fetching a post" })
    }

})
router.patch("/update-post/:id", verifyToken, isAdmin, async(req, res) => {
    try {
        const postId = req.params.id
        const updatePost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
        }, { new: true })
        if (!updatePost) {
            return res.status(404).send({
                message: "post not found"
            })
        }
        res.status(200).send({
            message: "Post update successfully",
            post: updatePost
        })
    } catch (error) {
        console.log("Error in updating a post.", error);
        res.status(500).json({ message: "Error in updating a post" })
    }
})
router.delete("/:id", verifyToken, isAdmin, async(req, res) => {
    try {
        const postId = req.params.id
        const deletedPost = await Blog.findByIdAndDelete(postId)
        if (!deletedPost) {
            return res.status(404).send({ message: "Post not found" })
        }
        await Comment.deleteMany({ postId: postId })
        res.status(200).send({
            message: "Post deleted successfully",
            post: deletedPost
        })
    } catch (error) {
        console.log("Error in deleting a post.", error);
        res.status(500).json({ message: "Error in deleting a post" })
    }
})

// releted post 
router.get("/related/:id", async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Invalid id" });
        }
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(400).json({ message: "Blog not found" });
        }
        const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i');
        const relatedQuery = {
            _id: { $ne: id },
            title: { $regex: titleRegex }
        }
        const relatedPost = await Blog.find(relatedQuery)
        res.status(200).send(relatedPost)


    } catch (error) {
        console.log("Error in fetching related post.", error);
        res.status(500).json({ message: "Error in fetching related post" })
    }
})



module.exports = router
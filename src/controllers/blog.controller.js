const cloudinary = require('../config/cloudinary.config');
const fs = require('fs');
const { promisify } = require('util');
const Blog = require('../models/Blog');

const deleteFile = (path) => {
    promisify(fs.unlink)(path);
}

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({ blogs })
    } catch (error) {
        return res.status(500).json({ error: "Something wen't wrong" })
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findOneAndUpdate({ _id: blogId }, { $inc: { views: 1 } }, { new: true })
        res.status(200).json({ blog });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something wen't wrong" })
    }
}

exports.reactBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findOneAndUpdate({ _id: blogId }, { $inc: { reacts: 1 } }, { new: true });
        res.status(200).json({ blog });
    } catch (error) {
        return res.status(500).json({ error: "Something wen't wrong" })
    }
}

exports.createBlog = async (req, res) => {
    try {
        const { title, blog } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" })
        }
        if (!blog) {
            return res.status(400).json({ error: "Blog is required" })
        }
        if (!Object.keys(req.file).length) {
            return res.status(400).json({ error: "Image is required" })
        }
        const image = await cloudinary.uploader.upload(req.file.path, { folder: "ContentManagementApplication/blogs" });
        const _blog = { ...req.body, image: { public_id: image.public_id, url: image.secure_url } }
        deleteFile(req.file.path);
        const blogData = await Blog.create(_blog);
        if (!blogData) {
            res.status(500).json({ error: "Can't create Blog" });
        }
        return res.status(201).json({ message: "Blog created Successfully", blogData })
    } catch (error) {
        res.status(500).json({ error: "Can't create blog" });
    }
}
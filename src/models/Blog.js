const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [5, "Title must be at least 5 characters"],
        max: [200, "Title is too large"],
        trim: true
    },
    blog: {
        type: String,
        required: [true, "Blog body is required"],
    },
    reacts: {
        type: Number,
        default: 0,
        min: 0
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    views: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true })

const Blog = model("Blog", blogSchema);

module.exports = Blog;
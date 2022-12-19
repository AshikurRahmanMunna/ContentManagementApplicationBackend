const { createBlog, getBlogs, reactBlog, getBlogById } = require('../controllers/blog.controller');
const upload = require('../utils/upload');

const router = require('express').Router();

router.route('/').post(upload.single("image"), createBlog).get(getBlogs);
router.route('/react-blog/:id').get(reactBlog)
router.route('/:id').get(getBlogById)

module.exports = router;
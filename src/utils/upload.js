const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const { default: slugify } = require('slugify');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "..", "tmp")),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${slugify(file.originalname)}-${shortid.generate()}`)
});

const fileFilter = (req, file, cb) => {
    const supported = /png|jpg|jpeg|webp|gif/;
    if (supported.test(path.extname(file.originalname))) {
        cb(null, true);
    } else {
        cb(new Error("Only png, jpg, jpeg, webp and gif files are supported"));
    }
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload;
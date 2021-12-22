const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        console.log(file.mimetype);
        callback(null, Date.now() + '.' + extension);
        console.log(extension);
    }
});
console.log(storage);

module.exports = multer({ storage: storage }).single('image');
const router = require('express').Router();
const multer = require('../middleware/multer-config.middleware');
const postCtrl = require('../controllers/post.controller');

router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPost);

module.exports = router;
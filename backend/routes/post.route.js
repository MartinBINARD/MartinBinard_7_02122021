const router = require('express').Router();
const multer = require('../middleware/multer-config.middleware');
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;
const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');

router.post('/post', postCtrl.createPost);
router.get('/post', postCtrl.getOnePost);

module.exports = router;
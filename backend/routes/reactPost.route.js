const router = require('express').Router();
const reactPost = require('../controllers/react-post.controller');

router.put('/:id/like', reactPost.likePost);

module.exports = router;
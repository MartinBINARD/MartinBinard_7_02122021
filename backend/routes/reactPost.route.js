const router = require('express').Router();
const reactPost = require('../controllers/reactPost.controller');

router.put('/:id/like/:likeChoice', reactPost.likePost);

module.exports = router;
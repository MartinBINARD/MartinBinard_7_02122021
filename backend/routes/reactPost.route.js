const router = require('express').Router();
const reactPost = require('../controllers/reactPost.controller');

router.put('/:id/like/:likechoice', reactPost.likePost);

module.exports = router;
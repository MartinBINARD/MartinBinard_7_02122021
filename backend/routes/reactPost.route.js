const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const reactPost = require('../controllers/reactPost.controller');

router.put('/:id/like/:likeChoice', auth, reactPost.likePost);

module.exports = router;
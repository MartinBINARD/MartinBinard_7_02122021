const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const reactComment = require('../controllers/reactComment.controller');

router.put('/:id/like/:likeChoice', auth, reactComment.likeComment);

module.exports = router;
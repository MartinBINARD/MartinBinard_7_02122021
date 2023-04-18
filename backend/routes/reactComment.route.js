const router = require('express').Router();
const reactComment = require('../controllers/reactComment.controller');

router.put('/:id/like/:likeChoice', reactComment.likeComment);

module.exports = router;
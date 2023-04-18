const router = require('express').Router();
const commentCtrl = require('../controllers/comment.controller');

router.get('/one/:id', commentCtrl.getOneComment);
router.get('/:post_id',commentCtrl.getAllComment);
router.post('/:post_id', commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;
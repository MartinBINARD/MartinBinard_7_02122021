const router = require('express').Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

router.get('/one/:id', auth, commentCtrl.getOneComment);
router.get('/:post_id', auth, commentCtrl.getAllComment);
router.post('/:post_id', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
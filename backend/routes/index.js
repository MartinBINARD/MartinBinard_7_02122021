const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const postRoutes = require('./post.route');
const reactPostRoutes = require('./reactPost.route');
const commentRoutes = require('./comment.route');
const reactCommentRoutes = require('./reactComment.route');
const router = require('express').Router();

router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);

router.use('/api/post', postRoutes);
router.use('/api/post', reactPostRoutes);
router.use('/api/comment', commentRoutes);
router.use('/api/comment', reactCommentRoutes);

module.exports = router;

const db = require('../models');

const Comment = db.comments;

async function likeComment (req, res, next) {
    try {
        const alreadyLiked = await Comment.findOne({ where: {userId_comment_like }});

        if (alreadyLiked) {
            const removeLikeComment = await Comment.updateOne( { comment_id: req.params.id }, { $inc: {likeComment: -1 }, $pull: { userId_comment_like: req.body.user_id}} )
                res.status(200).send(removeLikeComment)
        } else {
            const likeComment = await Comment.updateOne( { comment_id: req.params.id }, { $inc: {likeComment: 1 }, $push: { userId_comment_like: req.body.user_id}} )
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = { likeComment }
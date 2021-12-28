const db = require('../models');

async function likePost (req, res, next) {
    try {
        const likePost = await Post.updateOne({ post_id : req.params.id }, { likePost : req.params.id }, { userId_post_like : req.params.id});
            res.status(200).send(likePost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { likePost };
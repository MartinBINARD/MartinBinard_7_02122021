const db = require('../models');

const Post = db.posts;

async function likePost (req, res, next) {
    try {
        const alreadyLiked = await Post.findOne({ where: { userId_post_like : req.params.userId_post_like }})

        if(alreadyLiked) {
            const removeLikePost = await Post.updateOne({ post_id : req.params.id }, { $inc : { likePost : -1 },  $pull : { userId_post_like : req.body.user_id } });
            res.status(200).send(removeLikePost)
        } else {
            const likePost = await Post.updateOne({ post_id : req.params.id }, { $inc : { likePost : 1 },  $push : { userId_post_like : req.body.user_id } });
            res.status(200).send(likePost)
        }
        
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { likePost };
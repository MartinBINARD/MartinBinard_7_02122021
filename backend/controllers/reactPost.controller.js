const db = require('../models');

const Post = db.posts;


async function likePost (req, res, next) {
    try {
        const postToUpdate = await Post.findOne({ where: { post_id : req.params.id }})
        switch(req.body.likeChoice){
            case 1: // User like
                let userLikedList = JSON.parse(postToUpdate.userId_post_like);
                if(!userLikedList){
                    userLikedList = [];
                }
                if(!userLikedList.include(req.body.user_id)){
                    userLikedList.push(req.body.user_id);
                    const likePost = await Post.updateOne({ post_id : req.params.id }, { post_like: (postToUpdate.post_like + 1), userId_post_like: JSON.stringify(userLikedList)});
                    res.status(200).send(likePost)
                }else{
                    res.status(200).send(postToUpdate)
                }
            break;
            case -1: // User dislike
                let userDislikedList = JSON.parse(postToUpdate.userId_post_dislike);
                if(!userDislikedList){
                    userDislikedList = [];
                }
                if(!userDislikedList.include(req.body.user_id)){
                    userDislikedList.push(req.body.user_id);
                    const likePost = await Post.updateOne({ post_id : req.params.id }, { post_dislike: (postToUpdate.post_dislike + 1), userId_post_dislike: JSON.stringify(userDislikedList)});
                    res.status(200).send(likePost)
                }else{
                    res.status(200).send(postToUpdate)
                }
            break;
            case 0: // User cancel like or dislike

                if(!userDislikedList){
                    userDislikedList = [];
                }

                if(!userLikedList){
                    userLikedList = [];
                }
                if(userDislikedList.include(req.body.user_id)){
                    userDislikedList = userDislikedList.filter(user_disliked_id => user_disliked_id !== req.body.user_id);
                    const likePost = await Post.updateOne({ post_id : req.params.id }, { post_dislike: (postToUpdate.post_dislike - 1), userId_post_dislike: JSON.stringify(userDislikedList)});
                    res.status(200).send(likePost)
                }else if(userLikedList.include(req.body.user_id)){
                    userLikedList = userLikedList.filter(user_disliked_id => user_disliked_id !== req.body.user_id);
                    const likePost = await Post.updateOne({ post_id : req.params.id }, { post_dislike: (postToUpdate.post_like - 1), userId_post_like: JSON.stringify(userDislikedList)});
                    res.status(200).send(likePost)
                }else{
                    res.status(200).send(postToUpdate)
                }
            break;
            default:
                res.status(200).send(postToUpdate)
            break;
        }        
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { likePost };
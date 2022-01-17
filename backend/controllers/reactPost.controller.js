const db = require('../models');

const Post = db.posts;

async function likePost (req, res, next) {
    try {
        let postToUpdate = await Post.findOne({ where: { post_id : req.params.id }});
		let userId = req.body.user_id;
		let userLikedList = postToUpdate.userId_post_like.split(",");
		let userDislikedList = postToUpdate.userId_post_dislike.split(",");
        switch(req.params.likeChoice){
            case "1": // User like
                if(!userLikedList.includes(""+userId)){
                    userLikedList.push(userId);
					userLikedList = userLikedList.join(","); 
                    await Post.update({ post_like: (postToUpdate.post_like + 1), userId_post_like: userLikedList},{where:{ post_id : req.params.id }});
					postToUpdate = await Post.findOne({ where: { post_id : req.params.id }});
                }
            break;
            case "-1": // User dislike
                if(!userDislikedList.includes(""+userId)){
                    userDislikedList.push(userId);
					userDislikedList = userDislikedList.join(",");
                    await Post.update({ post_dislike: (postToUpdate.post_dislike + 1), userId_post_dislike: userDislikedList},{where:{ post_id : req.params.id }});
					postToUpdate = await Post.findOne({ where: { post_id : req.params.id }});
                }
            break;
            case "0": // User cancel like or dislike
				console.log(userDislikedList);
				console.log("AND");
				console.log(userLikedList);
                if(userDislikedList.includes(""+userId)){
					let userDislikedListFinal = userDislikedList.filter(id => id !== ""+userId);
					console.log(userDislikedListFinal);
					userDislikedList = userDislikedListFinal.join(",");
					await Post.update({ post_dislike: (postToUpdate.post_dislike - 1), userId_post_dislike: userDislikedList},{where:{ post_id : req.params.id }});
					postToUpdate = await Post.findOne({ where: { post_id : req.params.id }});
                }else if(userLikedList.includes(""+userId)){
					let userLikedListFinal = userLikedList.filter(id => id !== ""+userId);
					console.log(userLikedListFinal);
					userLikedList = userLikedListFinal.join(",");
					await Post.update({ post_like: (postToUpdate.post_like - 1), userId_post_like: userLikedList},{where:{ post_id : req.params.id }});
					postToUpdate = await Post.findOne({ where: { post_id : req.params.id }});
                }
            break;
        } 
		res.status(200).send(postToUpdate);		
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { likePost };
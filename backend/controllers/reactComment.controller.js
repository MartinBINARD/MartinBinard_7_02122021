const db = require('../models');

const Comment = db.comments;

async function likeComment (req, res, next) {
    try {
        let commentToUpdate = await Comment.findOne({ where: { comment_id : req.params.id }});
		let userId = req.user;
        console.log('userId:');
        console.log(userId);
		let userLikedList = commentToUpdate.userId_comment_like.split(",");
		let userDislikedList = commentToUpdate.userId_comment_dislike.split(",");
        if (userLikedList.includes("" + req.user)) {
            req.params.likeChoice = "2";
        } else if (userDislikedList.includes("" + req.user)) {
            req.params.likeChoice = "2";
        }
        console.log("likeChoice:");
        console.log(req.params.likeChoice);
        switch(req.params.likeChoice){
            case "1": // User like
                if(!userLikedList.includes(""+userId)){
                    userLikedList.push(userId);
					userLikedList = userLikedList.join(","); 
                    await Comment.update({ comment_like: (commentToUpdate.comment_like + 1), userId_comment_like: userLikedList},{where:{ comment_id : req.params.id }});
					commentToUpdate = await Comment.findOne({ where: { comment_id : req.params.id }});
                }
            break;
            case "-1": // User dislike
                if(!userDislikedList.includes(""+userId)){
                    userDislikedList.push(userId);
					userDislikedList = userDislikedList.join(",");
                    await Comment.update({ comment_dislike: (commentToUpdate.comment_dislike + 1), userId_comment_dislike: userDislikedList},{where:{ comment_id : req.params.id }});
					commentToUpdate = await Comment.findOne({ where: { comment_id : req.params.id }});
                }
            break;
            case "2": // User cancel like or dislike
				console.log(userDislikedList);
				console.log("AND");
				console.log(userLikedList);
                if(userDislikedList.includes(""+userId)){
					let userDislikedListFinal = userDislikedList.filter(id => id !== ""+userId);
					console.log(userDislikedListFinal);
					userDislikedList = userDislikedListFinal.join(",");
					await Comment.update({ comment_dislike: (commentToUpdate.comment_dislike - 1), userId_comment_dislike: userDislikedList},{where:{ comment_id : req.params.id }});
					commentToUpdate = await Comment.findOne({ where: { comment_id : req.params.id }});
                }else if(userLikedList.includes(""+userId)){
					let userLikedListFinal = userLikedList.filter(id => id !== ""+userId);
					console.log(userLikedListFinal);
					userLikedList = userLikedListFinal.join(",");
					await Comment.update({ comment_like: (commentToUpdate.comment_like - 1), userId_comment_like: userLikedList},{where:{ comment_id : req.params.id }});
					commentToUpdate = await Comment.findOne({ where: { comment_id : req.params.id }});
                }
            break;
        } 
		res.status(200).send(commentToUpdate);		
    } catch (error) {
        res.status(500).send({ message : error.message });
        console.log(error);
        next();
    }
};

module.exports = { likeComment };
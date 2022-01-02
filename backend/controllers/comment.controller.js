const db = require('../models');

const Comment = db.comments;

async function createComment (req, res, next) {
    try{
        let infoComment = { ...req.body };

        const newComment = await Comment.create(infoComment)
            res.status(201).send(newComment)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

async function modifyComment (req, res, next) {
    try{
        let commentObject = req.file ? { ...JSON.parse(req.body.infoComment) }
            : { ...req.body };
        
        const updateComment = await Comment.updateOne({ comment_id :req.params.id }, { ...commentObject, comment_id: req.params.id })
            res.status(201).send(updateComment)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

async function deleteComment (req, res, next) {
    try{
        const commentObject = await Comment.findOne({ where : { post_id: req.params.id }});

        if(!commentObject) {
            res.status(404).send({ message: 'No such Comment !'})
        } else if (commentObject.userId !== req.auth.userId) {
            res.status(400).send({ message: 'Unauthorized request !'})
        } else {
            const discardComment = await Comment.destroy({ where: { comment_id: req.params.id }})
                res.status(200).send({ message: 'Comment deleted !'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = { createComment, modifyComment, deleteComment };
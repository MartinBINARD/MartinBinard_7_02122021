const db = require('../models');

const Post = db.posts;

async function createPost (req, res, next) {
    try{
        let infoPost = {
            // TO FILL IN
        }

        const newPost = await Post.create(infoPost)
            res.status(201).send(newPost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function getOnePost (req, res, next) {
    try{
        const allPost = await Post.findOne({ where : { post_id: req.params.id } })
            res.status(200).send(allPost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { createPost, getOnePost };
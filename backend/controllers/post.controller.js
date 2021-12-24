const db = require('../models');
const fs = require('fs');

const Post = db.posts;

async function createPost (req, res, next) {
    try{
        let infoPost = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        const newPost = await Post.create(infoPost)
            res.status(201).send(newPost, { message: 'New post created !' })
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function modifyPost (req, res, next) {
    try{
        let postObject = req.file ?
            {
                ...JSON.parse(req.body.infoPost),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };

        const updatePost = await Post.udpateOne({ post_id : req.params.id }, { ...postObject, post_id: req.params.id })
            res.status(201).send(updatePost, { message: 'Post modified !' })
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function deletePost (req, res, next) {
    try{
        // TO FILL IN
        const deletePost = await Post.findOne({ where : { post_id: req.params.id } })
            res.status(200).send({ message: 'Post deleted !' })
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function getOnePost (req, res, next) {
    try{
        const onePost = await Post.findOne({ where : { post_id: req.params.id } })
            res.status(200).send(onePost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function getAllPost (req, res, next) {
    try{
        const allPost = await Post.findAll({ })
            res.status(200).send(allPost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

module.exports = { createPost,
                   modifyPost,
                   deletePost,
                   getOnePost,
                   getAllPost };
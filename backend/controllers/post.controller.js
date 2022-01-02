const db = require('../models');
const fs = require('fs');
const { posts } = require("../models");

const Post = db.posts;

async function createPost (req, res, next) {
    try{
        let infoPost = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };

        const newPost = await Post.create(infoPost)
            res.status(201).send(newPost)
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
            res.status(201).send(updatePost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function deletePost (req, res, next) {
    try{
        const postObject = await Post.findOne({ where : { post_id: req.params.id } })
        
        if(!postObject) {
            res.status(404).send({ message: 'No such Post !'})
        } else if (postObject.userId !== req.auth.userId) {
            res.status(400).send({ message: 'Unauthorized request !'})
        } else {
            const filename = postObject.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, (error) => {
                console.log(error);
            })
            const deletePost = await Post.destroy( { where: { post_id: req.params.id } })
                res.status(200).send({ message: 'Post deleted !' })
        }
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
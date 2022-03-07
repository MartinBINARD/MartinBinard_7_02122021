const db = require('../models');

const Post = db.posts;
const User = db.users;

async function createPost (req, res, next) {
    try{
        let img = null;

        if(req.file) {
            img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        let infoPost = {
            user_id: req.user,
            ...req.body,
            image: img
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
        let postObject = await Post.findOne({ where : { post_id: req.params.id }, include: [User] })

        const updatePost = await Post.udpate({ ...postObject }, { where: { post_id : req.params.id } });
            res.status(201).send(updatePost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function deletePost (req, res, next) {
    try{
        const postObject = await Post.findOne({ where : { post_id: req.params.id }, include: [User] });
        
        if(!postObject) {
            res.status(404).send({ message: 'No such Post !'})
        }
        if (postObject.user.user_id !== req.auth.userId) {
            res.status(400).send({ message: 'Unauthorized request !'})
        }

        if( postObject.image != null) {
            const filename = postObject.image.split('/images')[1];
            fs.unlink(`images/${filename}`, (error) => {
                console.log(error);
            })
        }
        
        const deletePost = await Post.destroy( { where: { post_id: req.params.id } })
            res.status(200).send({ message: 'Post deleted !'})
        
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function getOnePost (req, res, next) {
    try{
        const onePost = await Post.findOne({ where : { post_id: req.params.id }, include: [User] })
            res.status(200).send(onePost)
    } catch (error) {
        res.status(500).json({ message : error.message })
        next();
    }
};

async function getAllPost(req, res, next) {
    try {
        let allPost = await Post.findAll({ include: [User] });
        let postToShow = [];
        allPost.forEach(element => {
            let userLikedList = element.userId_post_like.split(",");
            let userDislikedList = element.userId_post_dislike.split(",");
            if (userLikedList.includes("" + req.user)) {
                element.likeOption = 0;
            } else if (userDislikedList.includes("" + req.user)) {
                element.likeOption = 0;
            } else {
                element.likeOption = 1;
            }
            postToShow.push(element);
        });
        console.log(postToShow);
        res.status(200).send(postToShow)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = { createPost,
                   modifyPost,
                   deletePost,
                   getOnePost,
                   getAllPost };
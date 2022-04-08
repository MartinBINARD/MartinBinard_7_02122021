const db = require("../models");
const fs = require("fs");

const Post = db.posts;
const User = db.users;

async function createPost(req, res, next) {
  try {
    let img = null;

    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    let infoPost = {
      user_id: req.user,
      ...req.body,
      image: img,
    };

    const newPost = await Post.create(infoPost);
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function modifyPost(req, res, next) {
  try {
    const postObject = await Post.findOne({
      where: { post_id: req.params.id },
      include: [User],
    });

    if (postObject.user.user_id == req.user || req.admin == true) {
      if (postObject.image != null) {
        const filename = postObject.image.split("/images")[1];
        fs.unlink(`images/${filename}`, (error) => {
          console.log(error);
        });
      }

      if (req.file) {
        let modifiedPicture = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        let updateObject = {
          ...req.body,
          image: modifiedPicture,
        };

        const updatePost = await Post.update(
          { ...updateObject },
          { where: { post_id: req.params.id } }
        );
        res.status(201).send({ message: "Post modified !" });
      } else {
        let updateObject = { ...req.body, image: null };
        const updatePost = await Post.update(
          { ...updateObject },
          { where: { post_id: req.params.id } }
        );
        res.status(201).send({ message: "Post modified with no image !" });
      }
    } else {
      res.status(401).json({
        message:
          "You are not the post owner or you do not have root privileges !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function deletePost(req, res, next) {
  try {
    const postObject = await Post.findOne({
      where: { post_id: req.params.id },
      include: [User],
    });

    if (!postObject) {
      res.status(404).send({ message: "No such Post !" });
    }
    
    if (postObject.user.user_id == req.user || req.admin == true) {

      if (postObject.image != null) {
        const filename = postObject.image.split("/images")[1];
        fs.unlink(`images/${filename}`, (error) => {
          console.log(error);
        });
      }

      await Post.destroy({
        where: { post_id: req.params.id },
      });
      res.status(200).send({ message: "Post deleted !" });
    } else {
      res.status(401).json({
        message:
          "You are not the post owner or you do not have root privileges !",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function getOnePost(req, res, next) {
  try {
    const onePost = await Post.findOne({
      where: { post_id: req.params.id },
      include: [User],
    });
    res.status(200).send(onePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function getAllPost(req, res, next) {
  try {
    let allPost = await Post.findAll({ include: [User] });
    res.status(200).send(allPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

module.exports = { createPost, modifyPost, deletePost, getOnePost, getAllPost };

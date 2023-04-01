const db = require("../models");

const Comment = db.comments;
const User = db.users;
const Post = db.posts;

async function createComment(req, res, next) {
  try {
    let infoComment = {
      user_id: req.user,
      post_id: req.params.post_id,
      ...req.body,
    };
    console.log(infoComment);
    const newComment = await Comment.create(infoComment);
    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function modifyComment(req, res, next) {
  try {
    const commentObject = req.file
      ? { ...JSON.parse(req.body.infoComment) }
      : { ...req.body };

    if (commentObject.user.user_id == req.user || req.admin == true) {
      const updateComment = await Comment.update(
        { comment_id: req.params.id },
        { ...commentObject, comment_id: req.params.id }
      );
      res.status(201).send(updateComment);
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

async function deleteComment(req, res, next) {
  try {
    const commentObject = await Comment.findOne({
      where: { comment_id: req.params.id },
      include: [User],
    });

    if (!commentObject) {
      res.status(404).send({ message: "No such Comment !" });
    }

    if (commentObject.user.user_id == req.user || req.admin == true) {
      await Comment.destroy({
        where: { comment_id: req.params.id },
      });
      res.status(200).send({ message: "Comment deleted !" });
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

async function getOneComment(req, res, next) {
  try {
    const oneComment = await Comment.findOne({
      where: { comment_id: req.params.id },
      include: [User, Post],
    });
    res.status(200).send(oneComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllComment(req, res, next) {
  try {
    const allComment = await Comment.findAll({
      where: { post_id: req.params.post_id },
      include: [User, Post],
    });
    res.status(200).send(allComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

module.exports = {
  createComment,
  modifyComment,
  deleteComment,
  getOneComment,
  getAllComment,
};

const db = require("../models");
const fs = require("fs");

//LOAD MODELS
const User = db.users;
const Post = db.posts;

async function getOneUser(req, res, next) {
  try {
    const oneUser = await User.findOne({ where: { user_id: req.user } });
    res.status(200).send(oneUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function getAllUser(req, res, next) {
  try {
    const allUser = await User.findAll({});
    res.status(200).send(allUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

// MODIFY AVATAR ONLY
async function modifyUser(req, res, next) {
  try {
    const userObject = await User.findOne({
      where: { user_id: req.params.id },
    });

    if (userObject.avatar != null) {
      const filename = userObject.avatar.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        console.log(error);
      });
    }

    if (req.file) {
      let modifiedAvater = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      let updateObject = {
        ...req.body,
        avatar: modifiedAvater,
      };

      await User.update(
        { ...updateObject },
        { where: { user_id: req.params.id } }
      );
      res.status(201).send({ message: "User avatar modified !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

// DEACTIVATE USER ACCOUNT TO ARCHIVED PERSONNAL INFORMATION DURING A PERIOD OF TIME
// IN ORDER TO RESPECT GENERAL DATA PROTECTION REGULATION AND AVOID TO CREATE
// A USER ACCOUNT EVER USED
async function deactivateUser(req, res, next) {
  try {
    let userObject = {
      ...req.body,
      active: false,
    };
    await User.update({ ...userObject }, { where: { user_id: req.params.id } });
    res.status(200).send({ message: "User deactivate !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

module.exports = {
  getOneUser,
  getAllUser,
  modifyUser,
  deactivateUser,
};

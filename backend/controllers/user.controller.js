const db = require("../models");
const fs = require("fs");
const { checkInput } = require("../utils/checkInput");

//LOAD MODELS
const User = db.users;
const Post = db.posts;

const modifyKeys = ["firstName", "lastName", "bio"];
const modifyAvatarKey = ["avatar"];

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

async function modifyUser(req, res, next) {
  try {
    const userCheck = checkInput(req.body, modifyKeys, "string");

    if (!userCheck) {
      res.status(400).send({ message: "Bad inputs !" });
    }

    const userObject = await User.findOne({
      where: { user_id: parseInt(req.params.id) },
    });

    if (userObject.avatar != null) {
      const filename = userObject.avatar.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        console.log(error);
      });
    }

    if (userObject) {
      let updateObject = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
      };

      const updateUser = await User.update(
        { ...updateObject },
        { where: { user_id: parseInt(req.params.id) } }
      );

      const getUpdatedUser = await User.findOne({
        where: { user_id: updateUser[0] },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["user_id", "email", "password", "admin", "active"],
        },
      });

      res
        .status(201)
        .send({ message: "User data modified !", user: getUpdatedUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function modifyAvatar(req, res, next) {
  try {
    const userCheck = checkInput(req.body, modifyAvatarKey, "string");

    if (!userCheck) {
      res.status(400).send({ message: "No avatar sent !" });
    }

    const userObject = await User.findOne({
      where: { user_id: parseInt(req.params.id) },
    });

    if (userObject.avatar != null) {
      const filename = userObject.avatar.split("/images")[1];
      fs.unlink(`images/${filename}`, (error) => {
        console.log(error);
      });
    }

    if (userObject && req.file) {
      const updateUser = await User.update(
        {
          avatar: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        },
        { where: { user_id: parseInt(req.params.id) } }
      );

      const getUpdatedUser = await User.findOne({
        where: { user_id: updateUser[0] },
        raw: true,
        nest: true,
        attributes: {
          exclude: ["user_id", "email", "password", "admin", "active"],
        },
      });

      res
        .status(201)
        .send({ message: "User avatar modified !", user: getUpdatedUser });
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
  modifyAvatar,
  deactivateUser,
};

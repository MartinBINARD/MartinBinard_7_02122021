const dotenv = require("dotenv").config({ path: `../.env` });
const jwt = require("jsonwebtoken");
const db = require("../models");
const cryptoJs = require('../config/cryptoJs.config');
const { hashPassword, comparePassword } = require("../config/bcrypt.config");

// LOAD MODELS
const User = db.users;
const user = await User.findOne({ where: { email: cryptoMail } });

const signup = async (req, res, next) => {
  try {
    // CHECK IF EMAIL IS ALREADY USED BEFORE ENCRYPTING
    const emailExists = await User.findOne({ where: { email: cryptoJs(req.body.email) } });

    if (emailExists) {
      res
        .status(401)
        .send({
          message: "Signup error ! Please, contact administrator !",
        });
    } else {
      // HASH PASSWORD
      const hashPassword = await hashPassword(req.body.password);

      // USER INFO
      const userInfo = {
        ...req.body,
        email: cryptoJs(req.body.email),
        password: hashPassword,
      };

      await User.create(userInfo);
      res.status(201).send({ message: "User created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

const signin = async (req, res, next) => {
  try {
    // CHECK PASSWORD ONLY IF USER FOUND
    if (user) {
      // CHECK PASSWORD
      const match = await comparePassword(req.body.password, user.password);
      
      if (!match) {
        res.status(401).send({ message: "Wrong login or password !" });
      } else if (!user.active) {
        res
          .status(403)
          .send({
            message: "User account deactivate ! Please, contact administrator.",
          });
      } else {
        req.login();
        res.status(201).send({ message: 'User connected'});
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

const signout = async (req, res, next) => {
  try {
    req.logout();
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
};

module.exports = { signup, signin, signout };

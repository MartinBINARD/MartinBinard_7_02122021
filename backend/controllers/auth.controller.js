const dotenv = require("dotenv").config({ path: `../.env` });
const cryptojs = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

// LOAD MODELS
const User = db.users;

async function signup(req, res, next) {
  try {
    // ENCRYPTED SENSITIVE USER INFO IN DATABASE
    const cryptoMail = cryptojs
      .HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`)
      .toString();

    // ENCRYPTED PASSWORD
    const bcryptPass = await bcrypt.hash(req.body.password, 10);

    // CHECK IF EMAIL IS ALREADY USED BEFORE ENCRYPTING
    const emailTaken = await User.findOne({ where: { email: cryptoMail } });

    // USER INFO
    let userInfo = {
      ...req.body,
      email: cryptoMail,
      password: bcryptPass,
    };

    if (emailTaken) {
      res
        .status(401)
        .send({
          message: "Email already exist ! Please, contact administrator !",
        });
    } else {
      const user = await User.create(userInfo);
      res.status(201).send({ message: "User created !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

async function login(req, res, next) {
  try {
    // CHECK IF ENCRYPTED MAIL EXIST
    const cryptoMail = cryptojs
      .HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`)
      .toString();
    const userLogin = await User.findOne({ where: { email: cryptoMail } });

    // CHECK PASSWORD ONLY IF USER FOUND
    if (!userLogin) {
      res.status(404).send({ message: "User not found !" });
    } else {
      // CHECK PASSWORD
      const bcryptPassValid = await bcrypt.compare(
        req.body.password,
        userLogin.password
      );
      // JWT TOKEN
      let userInfo = {
        userId: userLogin.user_id,
        token: jwt.sign(
          { userId: userLogin.user_id, admin: userLogin.admin },
          process.env.SECRET_TOKEN,
          { expiresIn: "24h" }
        ),
        admin: userLogin.admin,
      };

      if (!bcryptPassValid) {
        res.status(401).send({ message: "Wrong password !" });
      } else if (!userLogin.active) {
        res
          .status(403)
          .send({
            message: "User account deactivate ! Please, contact administrator.",
          });
      } else {
        res.status(200).json(userInfo);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

module.exports = { signup, login };

const dotenv = require("dotenv").config({ path: `../.env` });
const db = require("../models");
const cryptojs = require("crypto-js");

const { hashPassword, comparePassword } = require("../config/bcrypt.config");

// LOAD MODELS
const User = db.users;

const signup = async (req, res, next) => {
  try {
    // CHECK IF ENCRYPTED USER EMAIL IS ALREADY USED BEFORE HASH PASSWORD
    const encryptedEmail = cryptojs
      .HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`)
      .toString();

    const user = await User.findOne({ where: { email: encryptedEmail } });

    if (user) {
      res
        .status(401)
        .send({
          message: "Signup error ! Please, contact administrator !",
        });
    } else {
      // HASH PASSWORD
      const hash = await hashPassword(req.body.password);

      // USER INFO
      const userInfo = {
        ...req.body,
        email: encryptedEmail,
        password: hash,
      };

      await User.create(userInfo);
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

const signin = async (req, res, next) => {
  try {
    const encryptedEmail = cryptojs
      .HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`)
      .toString();

    const user = await User.findOne({ where: { email: encryptedEmail } });
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
        req.login(user);
        const data = JSON.parse(JSON.stringify(user));
        res.status(201).json({
          id: data.user_id,
          firstName: data.firstname,
          lastName: data.lastname,
          avatar: data.avatar,
          active: data.active,
          admin: data.admin,
          createdAt: data.createdAt,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
}

const signout = async (req, res, next) => {
  try {
    req.logout().send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
};

const refreshToken = async (res, req, next) => {
  try {
    req.isAuthenticate().send({ message: "Refresh auth success"})
  } catch (error) {
    res.status(403).json({ message: error.message });
    req.logout().send({ message: "Authentication error" });
    next();
  }
};

module.exports = { signup, signin, signout, refreshToken };

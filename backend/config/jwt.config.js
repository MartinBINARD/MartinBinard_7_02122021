const dotenv = require('dotenv').config({ path: `../.env`});
const jwt = require('jsonwebtoken');
const db = require("../models");
const { app } = require('@/app');

const User = db.users;

const createJwtToken = (user) => {
  console.log('token typeof', typeof process.env.SECRET_TOKEN);
  return jwt.sign({ sub: user.user_id.toString() }, process.env.SECRET_TOKEN);
};

exports.createJwtToken = createJwtToken;

const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const user = await User.findOne({ where: { user_id: decodedToken.sub } });
      
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie('auth');
      }

    } catch (error) {
      res.clearCookie('auth');
    }
  } else {
    next();
  }
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticate = () => !!req.user;
  req.logout = () => res.clearCookie('auth');
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookies('auth', token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
app.use(addJwtFeatures);
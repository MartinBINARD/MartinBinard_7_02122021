const dotenv = require('dotenv').config({ path: `../.env`});
const jwt = require('jsonwebtoken');
const db = require("../models");
const app = require('../app');
require('cookie-parser');

const User = db.users;

const createJwtToken = (user) => {
  return jwt.sign(
    { sub: user.user_id.toString(), admin: user.admin.toString() },
    process.env.SECRET_TOKEN,
    { expiresIn: '1min' }
  );
};

exports.createJwtToken = createJwtToken;

const checkExpirationToken= async (req, res) => {
  console.log('checkExpToken', req);
  const decodedToken = jwt.verify(req, process.env.SECRET_TOKEN, { ignoreExpiration: true });
  console.log('decodedToken.exp', decodedToken.exp);
  const nowInSec = Math.floor(Date.now() / 1000);

  if(decodedToken.exp > nowInSec) {
    const user = await User.findOne({ where: { user_id: decodedToken.sub } });
    const jwtToken = jwt.sign(
      { sub: user.user_id.toString(), admin: user.admin.toString() },
      process.env.SECRET_TOKEN,
      { expiresIn: '3s'}
    );

    return jwtToken;
  }

  return null;
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticate = (token) => {
    const newToken = checkExpirationToken(token);

    if(null !== newToken) {
      res.cookie('auth', newToken, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: process.env.NODE_ENV !== "development",
        // maxAge: 1000 * 60 * 60 * 5,
        overwrite: true,  
      });
    }
  };

  req.logout = () => res.clearCookie('auth', {
    domain: process.env.DB_HOST,
    path:'/',
    secure: process.env.NODE_ENV !== "development",
    httpOnly: process.env.NODE_ENV !== "development",
    // maxAge: 1000 * 60 * 60 * 5,
    overwrite: true,
  });
  
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookie('auth', token, 
    {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: process.env.NODE_ENV !== "development",
      // maxAge: 1000 * 60 * 60 * 5,
      overwrite: true,
    }
    );
  };
  next();
};

// app.use(extractUserFromToken);
app.use(addJwtFeatures);

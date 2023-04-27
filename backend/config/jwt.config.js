const dotenv = require('dotenv').config({ path: `../.env`});
const jwt = require('jsonwebtoken');
const db = require("../models");
const app = require('../app');

const User = db.users;

const createJwtToken = (user) => {
  return jwt.sign(
    { sub: user.user_id.toString(), admin: user.admin.toString() },
    process.env.SECRET_TOKEN,
    { expiresIn: '5h' }
  );
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
        res.redirect('/submit/login');
      }

    } catch (error) {
      console.log('error', error);
      res.clearCookie('auth');
      res.redirect('/submit/login');
    }
  } else {
    next();
  }
};

const addJwtFeatures = (req, res, next) => {
  req.isAuthenticate = () => !!req.user;

  req.logout = () => res.clearCookie('auth', {
    domain: process.env.DB_HOST,
    path:'/',
    secure: process.env.NODE_ENV !== "development",
    httpOnly: process.env.NODE_ENV !== "development",
    // maxAge: 1000 * 60 * 60 * 5,

  }).send({ message: "Logout successful" });
  
  req.login = (user) => {
    const token = createJwtToken(user);
    res.cookie('auth', token, 
    {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: process.env.NODE_ENV !== "development",
      // maxAge: 1000 * 60 * 60 * 5,
    }
    );
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);

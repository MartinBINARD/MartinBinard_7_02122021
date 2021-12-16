const dotenv = require('dotenv').config({ path: `../.env` });
const cryptojs = require('crypto-js');
const db = require('../models');

// LOAD MODELS
const User = db.users;

const signup = async function (req, res, next) {
    try{
        // ENCRYPTED MAIL IN DATABASE
        const cryptoMail = cryptojs.HmacSHA512(req.body.email, `${process.USER_MAIL_CRYPTOJS_KEY}`).toString();
        // ENCRYPTED PASSWORD
        const bcryptPass = await bcrypt.has(req.body.password, 10);
        const user = await new User.create({ email: cryptoMail, password: hash });
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {signup};
const dotenv = require('dotenv').config({ path: `../.env` });
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const db = require('../models');

// LOAD MODELS
const User = db.users;

async function signup (req, res, next) {
    try{
        // ENCRYPTED SENSITIVE USER INFO IN DATABASE
        const cryptoMail = cryptojs.HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`).toString();
        const cryptoFirstname = cryptojs.HmacSHA512(req.body.firstname, `${process.USER_CRYPTOJS_KEY}`).toString();
        const cryptoLastname = cryptojs.HmacSHA512(req.body.lastname, `${process.USER_CRYPTOJS_KEY}`).toString();

        // ENCRYPTED PASSWORD
        const bcryptPass = await bcrypt.hash(req.body.password, 10);

        let userInfo = {
            firstname: cryptoFirstname,
            lastname: cryptoLastname,
            email: cryptoMail,
            password: bcryptPass,
            avatar: req.body.avatar,
            admin: req.body.admin,
            active: req.body.active
        };

        const user = await User.create( userInfo )
            res.status(201).send({ message: 'User created !'})

    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = {signup};
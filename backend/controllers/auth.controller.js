const dotenv = require('dotenv').config({ path: `../.env` });
const cryptojs = require('crypto-js');
const db = require('../models');

// LOAD MODELS
const User = db.users;

async function signup (req, res, next) {
    try{
        // ENCRYPTED MAIL IN DATABASE
        const cryptoMail = cryptojs.HmacSHA512(req.body.email, `${process.USER_MAIL_CRYPTOJS_KEY}`).toString();
        // ENCRYPTED PASSWORD
        const bcryptPass = await bcrypt.has(req.body.password, 10);
        const user = await new User.create({ email: cryptoMail, password: hash });
        
        user.save()
            .then(() => res.status(201).json({ message: 'User created !'}))
            .catch(error => res.status(400).json({ message: error.message }));

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {signup};
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
        // const cryptoFirstname = cryptojs.HmacSHA512(req.body.firstname, `${process.USER_CRYPTOJS_KEY}`).toString();
        // const cryptoLastname = cryptojs.HmacSHA512(req.body.lastname, `${process.USER_CRYPTOJS_KEY}`).toString();

        // ENCRYPTED PASSWORD
        const bcryptPass = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({ 
            firstname: String,
            lastname: String,
            email: cryptoMail,
            password: bcryptPass,
            avatar: String,
            admin: String,
            admin: false,
            active: true
         });
        
        const userSave = await user.save(() => res.status(201).json({ message: 'User created !'})).catch(error => res.status(400).json({ message: error.message }));
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = {signup};
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

        // ENCRYPTED PASSWORD
        const bcryptPass = await bcrypt.hash(req.body.password, 10);

        // CHECK IF EMAIL IS ALREADY USED BEFORE ENCRYPTING
        const emailTaken = await User.findOne({ where: { email: cryptoMail }});
        
        if (emailTaken) {
            res.status(401).send({ message: 'Email already exist !'})
        } else {

            let userInfo = {
                ...req.body,
                email: cryptoMail,
                password: bcryptPass,
                // avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            };
    
            const user = await User.create( userInfo )
                res.status(201).send({ message: 'User created !'});
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = {signup};
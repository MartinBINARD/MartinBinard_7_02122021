const dotenv = require('dotenv').config({ path: `../.env` });
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    
        // USER INFO
        let userInfo = {
            ...req.body,
            email: cryptoMail,
            password: bcryptPass,
            // avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };

        if (emailTaken) {
            res.status(401).send({ message: 'Email already exist !'})
        } else {
            const user = await User.create( userInfo )
                res.status(201).send({ message: 'User created !'});
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

async function login (req, res, next) {
    try{
        // CHECK IF ENCRYPTED MAIL EXIST
        const cryptoMail = cryptojs.HmacSHA512(req.body.email, `${process.USER_CRYPTOJS_KEY}`).toString();
        const userLogin = await User.findOne({ where: { email: cryptoMail }});
        // CHECK PASSWORD
        const bcryptPassValid = await bcrypt.compare(req.body.password, User.password);
        // JWT TOKEN
        let token = {
            userId: User._id,
            token: jwt.sign(
                { userId: User._id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
            )
        };

        if (!userLogin) { res.status(401).send({ message: 'User not found !'}) }
        else if (!bcryptPassValid) { res.status(401).send({ message: 'Wrong password !'}) }
        else { 
            res.status(200).json(token)
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = { signup, login };
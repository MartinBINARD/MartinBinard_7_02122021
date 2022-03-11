const dotenv = require('dotenv').config({ path: `../.env`});
const jwt = require('jsonwebtoken');
// const db = require('../models');
// const User = db.users;

// CHECK GIVEN TOKEN & USER ID
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        const userId = decodedToken.userId;
        // const admin = decodedToken.admin;
        console.log('userID:');
        console.log(userId);
        req.auth = { userId };

        if(req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID !';
        } else {
            req.user = userId;~
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(403).json({ error: error | 'unauthenticated request !' })
    }
};
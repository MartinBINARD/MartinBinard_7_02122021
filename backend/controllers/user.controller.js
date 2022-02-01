const db  = require('../models');

//LOAD MODELS
const User = db.users;

async function getOneUser (req, res, next) {
    try{
        const oneUser = await User.findOne({ where : { user_id: req.user } })
            res.status(200).send(oneUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

async function getAllUser (req, res, next) {
    try{
        const allUser = await User.findAll({ })
            res.status(200).send(allUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
};

module.exports = { getOneUser, getAllUser };
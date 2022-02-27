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

async function modifyUser (req, res, next) {
    try {
        let userObject = req.file ?
            {
                ...JSON.parse(req.body.userInfo),
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
        
        const updateUser = await User.update({ ...userObject, user_id : req.params.id}, { where: { user_id : req.params.id } });
            res.status(201).send(updateUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
        next();
    }
}

module.exports = { getOneUser, getAllUser, modifyUser };
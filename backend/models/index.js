const sequelize = require("../config/dbConfig");
const db = {};

// IMPORT TABLES
const User = require("./userModel");
const Post = require("./postModel");
const Comment = require("./commentModel");

//CHECK DATABASE CONNECTION
sequelize.authenticate()
    .then(() => {
        console.log("Database connected !");
    })
    .catch((error) => {
        console.log("Unable to connect to database !", error );
    })

// SYNCHRONIZE DATA
sequelize
    .sync({ force: true })
    .then((result) => {
        return User.create({
            firstname : process.env.ADMIN_FIRSTNAME,
            lastname: process.env.ADMIN_LASTNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASS, 
            avatar: null,
            admin: "1" });
        console.log(result, "Database Synchronized !");
    })
    .then(user => {
        console.log("Admin user created !", user);
    })
    .catch((error) => {
        console.log(error);
    })

db.sequelize = sequelize;

module.exports = db;
const dotenv = require("dotenv").config({ path: `../.env` });
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

//CHECK DATABASE CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected !");
  })
  .catch((error) => {
    console.log("Unable to connect to database !", error);
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// LOAD MODELS
db.users = require("./userModel")(sequelize, DataTypes);
db.posts = require("./postModel")(sequelize, DataTypes);
db.comments = require("./commentModel")(sequelize, DataTypes);

// CREATE ADMIN USER BY DEFAULT
const User = db.users;
// let adminParam = {
//     firstname : process.env.ADMIN_FIRSTNAME,
//     lastname: process.env.ADMIN_LASTNAME,
//     email: process.env.ADMIN_EMAIL,
//     password: process.env.ADMIN_PASS,
//     avatar: null,
//     admin: true
// };

// 1 TO MANY RELATION
// USER/POST FOREIGN KEY
db.users.hasMany(db.posts);

db.posts.belongsTo(db.users);

// USER/COMMENT FOREIGN KEY
db.users.hasMany(db.comments);

db.comments.belongsTo(db.users);

// POST/COMMENT FOREIGN KEY
db.posts.hasMany(db.comments);

db.comments.belongsTo(db.posts);

// SYNCHRONIZE DATA
sequelize
  .sync()
  .then(() => {
    // return admin = User.create(adminParam);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = db;
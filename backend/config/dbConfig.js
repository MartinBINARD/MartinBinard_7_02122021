const dotenv = require("dotenv").config({ path: `../.env` });

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_USER_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});

module.exports = sequelize;
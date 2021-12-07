const dotenv = require('dotenv').config();

module.exports = {
    host: DB_LOCALHOST,
    user: DB_USER,
    password: DB_USER_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
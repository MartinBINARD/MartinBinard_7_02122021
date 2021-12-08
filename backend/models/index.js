const dbConfig = require('../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch( error => {
        console.log('Error' + error);
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);
db.posts = require('./postModel')(sequelize, DataTypes);
db.comments = require('./commentModel')(sequelize, DataTypes);

// SYNCHRNOIZE DATABASE WITHOUT OVERWRITING
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized!');
    })

module.exports = db;
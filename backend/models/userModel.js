const sequelize = require("../config/dbConfig");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
    }
})

module.exports = User;
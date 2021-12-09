const sequelize = require("../config/dbConfig");
const Sequelize = require("sequelize");

const Comment = sequelize.define("comment", {
    comment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    comment_like: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_dislike: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_love: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_celebrate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_support: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_insighful: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    comment_curious: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    }
})

module.exports = Comment;
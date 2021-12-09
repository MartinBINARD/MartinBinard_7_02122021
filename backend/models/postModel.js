const sequelize = require("../config/dbConfig");
const Sequelize = require("sequelize");

const Post = sequelize.define("post", {
    post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    post_like: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_dislike: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_love: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_celebrate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_support: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_insighful: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    post_curious: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    }
})

module.exports = Post;
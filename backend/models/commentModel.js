module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment_like: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_dislike: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_love: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_celebrate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_support: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_insighful: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_curious: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_like: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_dislike: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_love: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_post_celebrate: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_support: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_insighful: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        },
        userId_comment_curious: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '0'
        }
    })

    return Comment;
};
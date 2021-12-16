module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_like: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_dislike: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_love: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_celebrate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_support: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_insighful: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        post_curious: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        }
    })

    return Post;
};
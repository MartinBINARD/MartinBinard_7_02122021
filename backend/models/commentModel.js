module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT(500),
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
        }
    })

    return Comment;
}
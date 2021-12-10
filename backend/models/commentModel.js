module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define("comment", {
        comment_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: Datatypes.TEXT,
            allowNull: false
        },
        comment_like: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_dislike: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_love: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_celebrate: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_support: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_insighful: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        comment_curious: {
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        }
    })

    return Comment;
};
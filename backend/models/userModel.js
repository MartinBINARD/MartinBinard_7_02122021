module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: Datatypes.STRING(20),
            allowNull: false
        },
        lastname: {
            type: Datatypes.STRING(20),
            allowNull: false
        },
        email: {
            type: Datatypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: Datatypes.STRING(500),
            allowNull: false
        },
        avatar: {
            type: Datatypes.STRING(45),
            allowNull: true
        },
        admin: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    return User;
}
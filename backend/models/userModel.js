module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: '0'
        }
    })

    return User;
}
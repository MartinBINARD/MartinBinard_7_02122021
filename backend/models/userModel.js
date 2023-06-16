module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Datatypes.STRING(500),
      allowNull: false,
    },
    lastName: {
      type: Datatypes.STRING(500),
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING(500),
      allowNull: false,
    },
    avatar: {
      type: Datatypes.STRING(200),
      allowNull: true,
      defaultValue: null,
    },
    bio: {
      type: Datatypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    admin: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return User;
};

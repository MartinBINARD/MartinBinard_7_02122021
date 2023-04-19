const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  };
};

const comparePassword = (passwordCompared, passwordDb) => {
  return bcrypt.compare(passwordCompared, passwordDb);
};

module.exports = { hashPassword, comparePassword };
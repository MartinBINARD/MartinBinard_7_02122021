const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);

  } catch (error) {
    throw error;
  };
};

const comparePassword = (passwordCompared, passwordDb) => {
  return bcrypt.compare(passwordCompared, passwordDb);
};

module.exports = { hashPassword, comparePassword };
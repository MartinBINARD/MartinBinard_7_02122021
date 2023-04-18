const dotenv = require("dotenv").config({ path: `../.env` });
const cryptojs = require("crypto-js");

const cryptoJs = (email) => {
  return cryptojs
      .HmacSHA512(email, `${process.USER_CRYPTOJS_KEY}`)
      .toString();
};

module.exports = { cryptoJs };
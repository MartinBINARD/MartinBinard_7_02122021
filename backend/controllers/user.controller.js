const dotenv = require("dotenv").config({ path: `../.env` });
const db = require("../models");

// LOAD MODELS
const User = db.users;
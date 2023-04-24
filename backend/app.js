const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes');

const app = express();

module.exports = app;

app.use(cookieParser());
require('./config/jwt.config');

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(helmet());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTING
app.use(router);

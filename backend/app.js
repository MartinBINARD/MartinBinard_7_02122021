const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// IMPORT ROUTES
const authRoutes = require('./routes/auth.route');

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(express.json());

// ROUTING
app.use('/api/auth', authRoutes);

module.exports = app;
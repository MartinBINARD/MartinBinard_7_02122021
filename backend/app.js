const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// IMPORT ROUTES
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const reactPostRoutes = require('./routes/reactPost.route');
const commentRoutes = require('./routes/comment.route');
const reactCommentRoutes = require('./routes/reactComment.route');

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

app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTING
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post', reactPostRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/comment', reactCommentRoutes);

module.exports = app;
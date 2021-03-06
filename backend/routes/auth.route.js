const router = require('express').Router();
const multer = require('multer');

const authCtrl = require('../controllers/auth.controller');
const passValidMiddleware = require("../middleware/passValid.middleware");

router.post('/signup', passValidMiddleware, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;
const router = require('express').Router();

const authCtrl = require('../controllers/auth.controller');
const passValidMiddleware = require("../middleware/passValid.middleware");

router.post('/signup', passValidMiddleware, authCtrl.signup);
// router.post('/login', authCtrl.login);
// router.post('/recover', authCtrl.recover);

module.exports = router;
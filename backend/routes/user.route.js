const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const userCtrl = require('../controllers/user.controller');

router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);

module.exports = router;
const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUser);

module.exports = router;
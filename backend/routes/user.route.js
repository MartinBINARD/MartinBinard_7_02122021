const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const userCtrl = require('../controllers/user.controller');
const multer = require('../middleware/multer-config.middleware');

router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.put('/deactivate/:id', auth, userCtrl.deactivateUser);

module.exports = router;
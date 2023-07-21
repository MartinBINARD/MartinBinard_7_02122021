const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const multer = require("../middleware/multer-config.middleware");

router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUser);
router.put("/:id", userCtrl.modifyUser);
router.put("/:id", multer, userCtrl.modifyAvatar);
router.put("/deactivate/:id", userCtrl.deactivateUser);

module.exports = router;

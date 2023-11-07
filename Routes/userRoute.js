var express = require('express');
var router = express.Router();
var controller = require('../Controller/userController');
var controllerAdmin = require('../Controller/Admin/userController');

router.post("/getUser",controller.getUser);
router.post("/getUserById",controller.getUserById)
router.post("/getInforUser",controller.getInforUser);
router.post("/login",controller.login)
router.post("/facelogin",controller.faceLogin)
router.post("/register",controller.register);

router.post("/checkEmail",controller.checkEmail);
router.post("/checkUsername",controller.checkUsername);

router.get("/getFullUser",controllerAdmin.getFullUser);
router.post("/getIdUserFace",controller.getIdUserFace);
router.post("/updateGetIdUserFace",controller.updateGetIdUserFace);


router.post("/updateStatusUser",controllerAdmin.updateStatusUser);
router.post("/updateProfile",controller.updateProfile);
router.post("/updateAvatarUser", controller.updateAvatarUser);

module.exports = router;
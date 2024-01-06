var express = require('express');
var router = express.Router();
var controllerAdmin = require('../Controller/Admin/promotionController');

router.get("/getFullPromotion",controllerAdmin.getFullPromotion);
router.get("/getPromotionNews",controllerAdmin.getPromotionNews);
router.post("/updateTimeSale",controllerAdmin.updateTimeSale);
router.post("/updateQuanitySale",controllerAdmin.updateQuanitySale);
router.post("/addPromotion",controllerAdmin.addPromotion);
router.post("/deleteSale", controllerAdmin.deleteSale);
module.exports = router;
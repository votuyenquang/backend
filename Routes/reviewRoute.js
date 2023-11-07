var express = require('express');
var router = express.Router();
var controller = require('../Controller/reviewController');

router.post("/getReviewById",controller.getReviewById);
router.post("/addReview",controller.addReview);
router.post("/editReview",controller.editReview);
router.post("/getReviewByIdproduct", controller.getReviewByIdproduct);

//admin

router.get("/getFullReview",controller.getFullReview);
module.exports = router;
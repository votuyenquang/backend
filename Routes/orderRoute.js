var express = require('express');
var router = express.Router();
var controller = require('../Controller/orderController');
var controllerSale = require('../Controller/promotionController');
var controllerAdmin = require('../Controller/Admin/orderController');

router.post("/getProductFavorite",controller.getProductFavorite)
router.post("/getProductByCartApp",controller.getProductByCartApp)
router.post("/getProductByCart",controller.getProductByCart)
router.post("/addBill",controller.addBill);
router.post("/getBillByIdUser",controller.getBillByIdUser);
router.post("/getProductByIdBill",controller.getProductByIdBill);
router.post("/getBillById",controller.getBillById)

router.post("/getSaleByCode",controllerSale.getSaleByCode);
router.post("/getSaleById",controllerSale.getSaleById);

router.get("/getFullBill",controllerAdmin.getFullBill);
router.post("/updateStatusBill",controllerAdmin.updateStatusBill);
router.post("/deleteBill",controllerAdmin.deleteBill);

module.exports = router;
var express = require('express');
var router = express.Router();
var controller = require('../Controller/productController');
var controllerAdmin = require('../Controller/Admin/productController');

//Client 
router.post('/getRecommendationProduct', controller.getRecommendationProduct);
// router.post('/getRecommendationDetails', controller.getRecommendationDetails);
router.get('/getTopProductSale', controller.getTopProductSale);// lấy 3 sản phẩm khuyến mãi nhất
router.get('/getproductSale', controller.getproductSale);
router.get('/getFullProduct',controller.getFullProduct);
router.get('/getProductType',controller.getProductType);
router.get('/getCategory',controller.getCategory);
router.get('/getProduct',controller.getProduct);
router.post('/getProductDetails',controller.getProductDetails);
router.post('/getCategoryById',controller.getCategoryById);
router.post('/getPrductTypeById',controller.getProductTypeById);
router.post('/getProductByType',controller.getProductByType);
router.post('/getProductByCategory',controller.getProductByCategory);
router.post('/getProductInventory',controller.getProductInventory);
router.post('/searchProduct',controller.searchProduct);
router.post('/getProductTypeByCategory',controller.getProductTypeByCategory)

//Page
router.get('/getProductNew/:page',controller.getProductNew);
router.get('/getProductDeal/:page',controller.getProductDeal);

//Admin
router.get('/getFullProductAdmin',controller.getFullProductAdmin);
router.post('/addProduct',controllerAdmin.addProduct);
router.post('/editProduct',controllerAdmin.editProduct);
router.post('/editProductType',controllerAdmin.editProductType);
router.post('/addProducType',controllerAdmin.addProducType);
router.post('/addCategory',controllerAdmin.addCategory);
router.post('/editCategory',controllerAdmin.editCategory);
router.post('/deleteProduct',controllerAdmin.deleteProduct);
router.get('/statisProductSold',controllerAdmin.statisProductSold);

module.exports = router;
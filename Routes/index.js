const express = require('express')
const productRouter = require("../Routes/productRoute");
const uploadRouter = require("../Routes/uploadRoute");
const userRouter = require("../Routes/userRoute");
const orderRouter = require("../Routes/orderRoute");
const inventoryRouter  = require("../Routes/inventoryRoute");
const promotionRouter = require("../Routes/promotionRoute");
const reviewRouter = require("../Routes/reviewRoute");
function route(app) {

    app.use('/upload', express.static('upload'));
    app.use('/uploads',uploadRouter);
    app.use("/product", productRouter);
    app.use("/user",userRouter);
    app.use("/order",orderRouter);
    app.use("/inventory",inventoryRouter);
    app.use("/promotion",promotionRouter);
    app.use("/review", reviewRouter);
    
}

module.exports = route;

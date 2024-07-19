const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.addProduct);

router.post("/:id/reviews", productController.addReview);

module.exports=router
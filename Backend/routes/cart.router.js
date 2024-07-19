const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.post("/add",cartController.addCart)

router.get("/:userId",cartController.getCart)

router.post("/remove",cartController.removeCart)



module.exports=router
router.g
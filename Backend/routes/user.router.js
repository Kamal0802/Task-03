const express=require("express")

const router=express.Router();

const userController = require("../controllers/user.controller")

router.post("/signup",userController.signup)

router.post("/login",userController.login)

router.get("/profile/:id",userController.getUserById)

router.get("/profile",userController.getUser)

module.exports =router
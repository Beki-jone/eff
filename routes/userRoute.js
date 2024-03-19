//use express router
const express=require("express");
const authMiddleware=require("../middleware/authMiddleware")
const router=express.Router();
//import user controllers
const {register,login,checkUser}=require("../controller/userController")
router.post("/register",register)
//Login Route
router.post("/login",login)
router.get("/check",authMiddleware,checkUser)
module.exports=router
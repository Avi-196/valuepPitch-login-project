const express=require("express")

const router=express.Router()

const usercontroller=require("../Controller/userController")
const middleware=require("../middleWare/auth")

router.get("avinay",function(req,res){
    console.log("testing server")
})

router.post("/registration",usercontroller.userDetails)


router.post("/login",usercontroller.loginUser)

router.get("/user/:userId/profile",middleware.authenticate,usercontroller.getUserDetailsById)

module.exports=router
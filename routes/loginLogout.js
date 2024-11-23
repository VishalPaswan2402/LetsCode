const express=require('express');
const router=express.Router({mergeParams:true});
const {loginUser,logoutUser}=require('../controllers/loginLogout');
const passport=require("passport");
const wrapAsync=require('../utility/wrapAsync');

router.post('/login',passport.authenticate("local",{failureRedirect:'/',failureFlash:true}),wrapAsync(loginUser));
router.get("/LogOut",wrapAsync(logoutUser));

module.exports=router;
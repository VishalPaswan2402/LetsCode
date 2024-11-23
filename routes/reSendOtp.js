const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync");
const {reSendOtp}=require('../controllers/reSendOtp');

router.get('/resendOtp',wrapAsync(reSendOtp));

module.exports=router;
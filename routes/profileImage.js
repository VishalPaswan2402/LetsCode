const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utility/wrapAsync');
const {profileImage}=require('../controllers/profileImage');
const {isLoggedIn,isOwner}=require('../middlewares/authenticateUser');

router.put('/:id',isLoggedIn,isOwner,wrapAsync(profileImage));

module.exports=router;

const express=require('express');
const router=express.Router({mergeParams:true});
const {validateUser}=require('../middlewares/validateUser');
const wrapAsync=require('../utility/wrapAsync');
const {signup}=require('../controllers/signup');

router.post('/Signup',validateUser,wrapAsync(signup));

module.exports=router;
const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utility/wrapAsync');
const {forgotPasswordForm,forgotPasswordUser}=require('../controllers/forgotPassword');

router.get('',wrapAsync(forgotPasswordForm));
router.post('/Verify',wrapAsync(forgotPasswordUser));

module.exports=router;
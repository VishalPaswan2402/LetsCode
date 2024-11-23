const express=require('express');
const router=express.Router({mergeParams:true});
const {isLoggedIn,isOwner} =require('../middlewares/authenticateUser');
const wrapAsync=require('../utility/wrapAsync');
const {showQuestions,markAsDone}=require('../controllers/showAndDone');

router.get('/topic/:Qtype',isLoggedIn,isOwner,wrapAsync(showQuestions));
router.put('/:qId/solved/:solvedType',isLoggedIn,isOwner,wrapAsync(markAsDone));

module.exports=router;
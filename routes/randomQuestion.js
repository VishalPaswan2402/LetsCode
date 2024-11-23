const express=require('express');
const router=express.Router({mergeParams:true});
const {pickRandomQuestion,displayRandomQuestion}=require('../controllers/randomQuestion');
const wrapAsync=require('../utility/wrapAsync');
const {isLoggedIn,isOwner}=require("../middlewares/authenticateUser");

router.put('/Pick/:id',isLoggedIn,isOwner,wrapAsync(pickRandomQuestion));
router.get('/:qId/Picked/user/:id/',isLoggedIn,isOwner,wrapAsync(displayRandomQuestion));

module.exports=router;
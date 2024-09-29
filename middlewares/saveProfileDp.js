const profileModel=require('../models/allProfile');
const profileImageList=require('../models/profileImage');
const saveProfileList=profileImageList.forEach((profDp)=>{
    const newDp=new profileModel({
        dpType:profDp.dpType,
        profileLink:profDp.profileLink,
    });
    newDp.save()
    .then(savedDp=>{
        console.log("Saved");
    })
    .catch(error=>{
        console.log("Some Error");
    });
});

module.exports={saveProfileList};
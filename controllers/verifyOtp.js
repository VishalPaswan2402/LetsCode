const allQuestion=require('../models/allQuestion');
const allUser=require('../models/user');
const allProfile=require("../models/allProfile");

module.exports.verifyOtp=async(req,res,next)=>{
    let {otp1,otp2,otp3,otp4,otp5,otp6}=req.body;
    let eOtp=otp1+otp2+otp3+otp4+otp5+otp6;
    let newUserData = req.session.newUserData;
    let findForgetData = req.session.findForgetData;
    if (newUserData) {
        const dp=Math.floor(Math.random()*10);
        let allDps=await allProfile.find();
        if(newUserData.otp==eOtp){
            let hrd=await allQuestion.find({level:"hard"});
            let mdm=await allQuestion.find({level:"medium"});
            let esy=await allQuestion.find({level:"easy"});
            let rank=(hrd.length*12)+(mdm.length*8)+(esy.length*4)+1;
            let password=newUserData.password1;
            let newUser=new allUser({username:newUserData.username,name:newUserData.names,email:newUserData.email,profileImage:allDps[dp].profileLink,rank:rank});
            let registeredUser=await allUser.register(newUser,password);
            req.login(registeredUser,(err)=>{
                if(err){
                    return next(err);
                }
                let currUserName=registeredUser.username;
                delete req.session.newUserData;
                req.session.userId=registeredUser._id;
                req.flash("success","OTP verified & account created successfully.");
                return res.redirect(`/LetsCode/user/${currUserName}`);
            })
        }
        else{
            req.flash("error","Incorrect OTP, please try again!");
            return res.redirect('/LetsCode/VerifyOtp');
        }
    }
    else if(findForgetData){
        delete req.session.newUserData;
        let uId=findForgetData.findDataId;
        let forOtp=findForgetData.otp;
        if(forOtp==eOtp){
            req.flash("success","Please enter your new password.");
            return res.redirect(`/LetsCode/Forget/Password/${uId}/NewPassword`);
        }
        else{
            req.flash("error","Incorrect OTP, please try again!");
            return res.redirect('/LetsCode/VerifyOtp');
        }
    }
    else {
        req.flash("error", "Session expired. Please try again later.");
        return res.redirect('/');
    }
};
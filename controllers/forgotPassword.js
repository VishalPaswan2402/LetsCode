const allUser=require('../models/user');

module.exports.forgotPasswordForm=async(req,res,next)=>{
    return res.render('forgetPassword.ejs');
};

module.exports.forgotPasswordUser=async(req,res,next)=>{
    let {username,email}=req.body;
    let findData=await allUser.findOne({username:username,email:email});
    if(findData){
        const otpGen = Math.floor(100000 + Math.random() * 900000);
        let findForgetData={
            findDataId:findData._id,
            email:findData.email,
            otp:otpGen,
            count:0
        }
        req.session.findForgetData=findForgetData;
        return res.redirect('/LetsCode/VerifyOtp');
    }
    else{
        req.flash("error", "No user found!");
        return res.redirect('/');
    }
};

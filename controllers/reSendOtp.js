module.exports.reSendOtp=async(req,res,next)=>{
    let newUserData = req.session.newUserData;
    let findForgetData = req.session.findForgetData;
    if(newUserData){
        let otpGen=newUserData.otp;
        const otp = Math.floor(100000 + Math.random() * 900000);
        newUserData.otp = otp;
        newUserData.count = (newUserData.count)+1;;
        req.session.newUserData = newUserData;
        otpGen=otp;
        req.flash('success',"New OTP send to your email.");
        return res.redirect('/LetsCode/VerifyOtp');
    }
    else if(findForgetData){
        let otpGen=findForgetData.otp;
        const otp = Math.floor(100000 + Math.random() * 900000);
        findForgetData.otp = otp;
        findForgetData.count = (findForgetData.count)+1;;
        req.session.findForgetData = findForgetData;
        otpGen=otp;
        req.flash('success',"New OTP send to your email.");
        return res.redirect('/LetsCode/VerifyOtp');
    }
    else{
        req.flash("error", "Session expired. Please try again later.");
        return res.redirect('/');
    }
};
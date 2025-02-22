const { forgetOtpFormat } = require("../middlewares/forgetOtpFormat");
const { otpFormat } = require("../middlewares/otpFormat");
const { otpSender } = require("../middlewares/otpSender");

module.exports.sendOtp = async (req, res, next) => {
    let newUserData = req.session.newUserData;
    // console.log("Re.");
    let findForgetData = req.session.findForgetData;
    if (newUserData) {
        delete req.session.findForgetData;
        let otpGen = newUserData.otp;
        let email = newUserData.email;
        // console.log(otpGen);
        if (newUserData.count > 2) {
            delete req.session.newUserData;
            req.flash("error", "You have exceeded the limit for sending OTPs. Please try again later.");
            return res.redirect("/");
        }
        otpSender(email, "Verification code for registration on Let's Code.", "", otpFormat(newUserData.names, otpGen));
        return res.render('emailVerify.ejs', { email })
    }
    else if (findForgetData) {
        delete req.session.newUserData;
        let otpGen = findForgetData.otp;
        let email = findForgetData.email;
        // console.log(otpGen);
        if (findForgetData.count > 2) {
            delete req.session.findForgetData;
            req.flash("error", "You have exceeded the limit for sending OTPs. Please try again later.");
            return res.redirect("/");
        }
        otpSender(email, "Verification code for forget password on Let's Code.", "", forgetOtpFormat(findForgetData.findDataName, otpGen));
        return res.render('emailVerify.ejs', { email });
    }
    else {
        req.flash("error", "Session expired. Please try again later.");
        return res.redirect('/');
    }
};
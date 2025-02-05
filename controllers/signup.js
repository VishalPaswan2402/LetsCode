const allUser = require('../models/user');

module.exports.signup = async (req, res, next) => {
    let { username, name, email, password, password2 } = req.body;
    if (password != password2) {
        req.flash("error", "Password not match, Please signup again.");
        return res.redirect('/');
    }
    let oldUser = await allUser.findOne({ username: username });
    if (oldUser) {
        req.flash("error", "User with this username already exist.");
        return res.redirect('/');
    }
    let oldEmail = await allUser.findOne({ email: email });
    if (oldEmail) {
        req.flash("error", "User with this E-mail already exist.");
        return res.redirect('/');
    }
    const otpGen = Math.floor(100000 + Math.random() * 900000);
    // console.log(otpGen);
    let newUserData = {
        username: username,
        names: name,
        email: email,
        password1: password,
        otp: otpGen,
        count: 0
    };
    req.session.newUserData = newUserData;
    // console.log("Here");
    return res.redirect('/LetsCode/VerifyOtp');
};
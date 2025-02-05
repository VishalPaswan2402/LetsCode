const allUser = require("../models/user");

module.exports.changePasswordPage = async (req, res, next) => {
    let { id } = req.params;
    let forgetUser = await allUser.findById(id);
    let uName = forgetUser.username;
    let email = forgetUser.email;
    return res.render("changePassword.ejs", { uName, email });
};

module.exports.updatePassword = async (req, res, next) => {
    let { passwordSet } = req.body;
    let findForgetData = req.session.findForgetData;
    if (findForgetData) {
        let id = findForgetData.findDataId;
        delete req.session.newUserData;
        delete req.session.findForgetData;
        let currUserData = await allUser.findById(id);
        let userName = currUserData.username;
        let newPass = await currUserData.setPassword(passwordSet);
        newPass.save();
        req.flash('success', "Password changed successfully. Login with new password.");
        return res.redirect('/');
    }
    else {
        req.flash("error", "Session expired. Please try again later.");
        return res.redirect('/');
    }
};
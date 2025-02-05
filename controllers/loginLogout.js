module.exports.loginUser = async (req, res, next) => {
    let currentUser = req.user;
    let username = currentUser.username;
    req.session.userId = currentUser._id;
    req.flash("success", "You are logged in successfully.");
    return res.redirect(`/LetsCode/user/${username}`);
};

module.exports.logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        delete req.session.userId;
        res.clearCookie('connect.sid');
        req.flash("success", "You are logged-out successfully.");
        return res.redirect('/');
    })
};
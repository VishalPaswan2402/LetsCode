const allUser = require("../models/user");
const allProfile = require('..//models/allProfile');

module.exports.profileImage = async (req, res, next) => {
    let { id } = req.params;
    let { profNumber } = req.body;
    let profType = profNumber.charAt(0);
    let profNum = parseInt(profNumber.charAt(1));
    let userData = await allUser.findById(id);
    if (profNumber === '') {
        req.flash("error", "Unable to update the profile image.");
        return res.redirect(`/LetsCode/user/${userData.username}`);
    }
    if (profType === 'b') {
        let profUp = 'boy' + profNum;
        let boysDp = await allProfile.findOne({ dpType: profUp });
        let applyLink = boysDp.profileLink;
        let updateProf = await allUser.findByIdAndUpdate(id, { profileImage: applyLink });
        updateProf.save();
    }
    else {
        let profUp = 'girl' + profNum;
        let girlsDp = await allProfile.findOne({ dpType: profUp });
        let applyLink = girlsDp.profileLink;
        let updateProf = await allUser.findByIdAndUpdate(id, { profileImage: applyLink });
        updateProf.save();
    }
    req.flash("success", "Profile image updated successfully.")
    return res.redirect(`/LetsCode/user/${userData.username}`);
};
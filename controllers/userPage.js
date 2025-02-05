const allUser = require('../models/user');
const allQuestion = require('../models/allQuestion');

module.exports.userPage = async (req, res, next) => {
    let { username } = req.params;
    let userData = await allUser.findOne({ username: username });
    let allQues = await allQuestion.find();
    let queLen = allQues.length;
    let easyQue = await allQuestion.find({ level: "easy" });
    let medQue = await allQuestion.find({ level: "medium" });
    let hrdQue = await allQuestion.find({ level: "hard" });
    let eLen = easyQue.length;
    let mLen = medQue.length;
    let hLen = hrdQue.length;
    let easyPer = ((userData.easySol / easyQue.length) * 100).toFixed(1);
    let mediumPer = ((userData.mediumSol / medQue.length) * 100).toFixed(1);
    let hardPer = ((userData.hardSol / hrdQue.length) * 100).toFixed(1);
    return res.render("userPage.ejs", { userData, eLen, easyPer, mLen, mediumPer, hLen, hardPer, queLen });
};
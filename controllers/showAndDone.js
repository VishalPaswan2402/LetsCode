const allQuestion=require('../models/allQuestion');
const allUser = require('../models/user');

module.exports.showQuestions=async(req,res,next)=>{
    let {Qtype,id}=req.params;
    let ques=await allQuestion.find({topic:Qtype});
    let userData=await allUser.findById(id);
    return res.render('questionPage.ejs',{ques,id,userData})
};

module.exports.markAsDone=async(req,res,next)=>{
    let {id,qId,solvedType}=req.params;
    let findData=await allUser.findById(id);
    let findQue=await allQuestion.findById(qId);
    let qLevel=findQue.level;
    let solvedTotal=findData.solvedQues+1;
    let occur=false;
    if(qLevel==="easy"){
        let solved=findData.easySol+1;
        let allEasy=await allUser.findById(id);
        let currRank=allEasy.rank;
        currRank-=4;
        let easyQ=allEasy.easyId.length;
        if(easyQ>0){
            for (let element of allEasy.easyId) {
                if (element === qId) {
                    occur=true;
                    req.flash("success","Already marked as done!");
                    break;
                }
            }
        }
        if(!occur){
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,easySol:solved,$push: { easyId: qId },rank:currRank});
            updateData.save();
            if(solvedType==="topicSolved"){
                req.flash("success","Great! You have solved one more question.");
            }else{
                req.flash("success","Well done! You've solved the question that was randomly generated.");
            }
        }
    }else if(qLevel==="medium"){
        let solved=findData.mediumSol+1;
        let allMed=await allUser.findById(id);
        let currRank=allMed.rank;
        currRank-=8;
        let medQ=allMed.mediumId.length;
        if(medQ>0){
            for (let element of allMed.mediumId) {
                if (element === qId) {
                    occur=true;
                    req.flash("success","Already marked as done!");
                    break;
                }
            }
        }
        if(!occur){
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,mediumSol:solved,$push: { mediumId: qId },rank:currRank});
            updateData.save();
            if(solvedType==="topicSolved"){
                req.flash("success","Great! You have solved one more question.");
            }else{
                req.flash("success","Well done! You've solved the question that was randomly generated.");
            }
        }
    }else{
        let solved=findData.hardSol+1;
        let allHard=await allUser.findById(id);
        let currRank=allHard.rank;
        currRank-=12;
        let hardQ=allHard.hardId.length;
        if(hardQ>0){
            for (let element of allHard.hardId) {
                if (element === qId) {
                    occur=true;
                    req.flash("success","Already marked as done!");
                    break;
                }
            }
        }
        if(!occur){
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,hardSol:solved,$push: { hardId: qId },rank:currRank});
            updateData.save();
            if(solvedType==="topicSolved"){
                req.flash("success","Great! You have solved one more question.");
            }else{
                req.flash("success","Well done! You've solved the question that was randomly generated.");
            }
        }
    }
    if(solvedType==="topicSolved"){
        return res.redirect(`/LetsCode/${id}/topic/${findQue.topic}`);
    }else{
        return res.redirect(`/LetsCode/user/${findData.username}`);
    }
};
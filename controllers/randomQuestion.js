const allQuestion=require("../models/allQuestion");
const allUser=require("../models/user");

module.exports.pickRandomQuestion=async(req,res,next)=>{
    let {id}=req.params;
    let{qLevel}=req.body;
    let randomQuestionId;
    if(qLevel==='random'){
        let allQue=await allQuestion.find();
        let randomNum=Math.floor((Math.random()*allQue.length));
        randomQuestionId=allQue[randomNum]._id;
    }
    else{
        let allQue=await allQuestion.find({level:qLevel});
        let randomNum=Math.floor((Math.random()*allQue.length));
        randomQuestionId=allQue[randomNum]._id;
    }
    req.flash("success","Here’s a randomly generated question for you.");
    return res.redirect(`/LetsCode/randomQue/${randomQuestionId}/Picked/user/${id}/`);
};

module.exports.displayRandomQuestion=async(req,res,next)=>{
    let{qId,id}=req.params;
    let userData=await allUser.findById(id);
    let randomQuestion=await allQuestion.findById(qId);
    return res.render(`randomQuestionPage.ejs`,{randomQuestion,userData});
};
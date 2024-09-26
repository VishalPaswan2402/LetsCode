const express = require('express')
const app = express()
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const expressError=require('./utility/expressError');
const wrapAsync=require('./utility/wrapAsync');
const mongoose = require('mongoose');
const allUser=require('./models/user');
const allQuestion=require('./models/allQuestion');
// const allQuestionList=require('./middlewares/saveQuestions')

const session=require("express-session");
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const sessionOption={
    secret:'letsCode',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOption));

mongoose.connect('mongodb://127.0.0.1:27017/LetsCode')
  .then(() => console.log('Connected! to mongoose'));

var flash = require('connect-flash');
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // res.locals.currUsers=req.user;
    next();
}) 

// Home page...
app.get('/',(req,res)=>{
    res.render("homePage.ejs");
});

// signup page...
app.post('/LetsCode/Signup',wrapAsync(async(req,res,next)=>{
    let{username,names,email,password1,password2}=req.body;
    if(password1!=password2){
        req.flash("error","Password not match, Please signup again.");
        return res.redirect('/');
    }
    const otpGen = Math.floor(100000 + Math.random() * 900000);
    console.log(otpGen);
    let newUserData = {
        username: username,
        name: names,
        email: email,
        password1: password1,
        otp:otpGen,
        count:0
    };
    req.session.newUserData = newUserData;
    res.redirect('/LetsCode/VerifyOtp');
}));

//send otp on page
app.get('/LetsCode/VerifyOtp',wrapAsync(async(req,res,next)=>{
    let newUserData = req.session.newUserData;
    if (!newUserData) {
        req.flash("error", "Session expired. Please sign up again.");
        return res.redirect('/LetsCode/Signup');
    }
    let otpGen = newUserData.otp;
    let email = newUserData.email;
    console.log(otpGen);
    if(newUserData.count>2){
        delete req.session.newUserData;
        req.flash("error","You have exceeded the limit for sending OTPs. Please try again later.");
        return res.redirect("/");
    }
    res.render('emailVerify.ejs',{email})
}));

// resendOtp
app.get('/LetsCode/resendOtp',wrapAsync(async(req,res,next)=>{
    let newUserData = req.session.newUserData;
    if (!newUserData) {
        req.flash("error", "Session expired. Please sign up again.");
        return res.redirect('/LetsCode/Signup');
    }
    let otpGen=newUserData.otp;
    const otp = Math.floor(100000 + Math.random() * 900000);
    newUserData.otp = otp;
    newUserData.count = (newUserData.count)+1;;
    req.session.newUserData = newUserData;
    otpGen=otp;
    res.redirect('/LetsCode/VerifyOtp');
}))

// email otp verify...
app.post('/LetsCode/verifyEmail',wrapAsync(async(req,res,next)=>{
    let {otp1,otp2,otp3,otp4,otp5,otp6}=req.body;
    let eOtp=otp1+otp2+otp3+otp4+otp5+otp6;
    console.log(eOtp);
    let newUserData = req.session.newUserData;
    if (newUserData) {
        console.log(newUserData.username, newUserData.name, newUserData.email, newUserData.password1,newUserData.otp);
        if(newUserData.otp==eOtp){
            console.log("Same");
            let newUser= new allUser({username:newUserData.username,name:newUserData.name,email:newUserData.email,password:newUserData.password1});
            newUser.save();
            let newAc=await allUser.findOne({username:newUserData.username});
            let currUserName=newUserData.username;
            delete req.session.newUserData;
            req.flash("success","OTP verified & account created successfully.");
            res.redirect(`/LetsCode/user/${currUserName}`);
            
        }
        else{
            console.log("Diff");
            req.flash("error","Incorrect OTP, please try again!");
            res.redirect('/LetsCode/VerifyOtp');
        }
        
    } else {
        req.flash("error", "Session expired. Please sign up again.");
        res.redirect('/');
    }
}));


// login...
app.post('/LetsCode/login',wrapAsync(async(req,res,next)=>{
    let{username,password}=req.body;
    let currentUser=await allUser.findOne({username:username,password:password});
    if(!currentUser){
        req.flash("error","User does not exist.");
        return res.redirect('/');
    }
    req.flash("success","You are logged in successfully.");
    res.redirect(`/LetsCode/user/${currentUser.username}`);
}));


// userpage...
app.get('/LetsCode/user/:username',wrapAsync(async(req,res,next)=>{
    let{username}=req.params;
    let userData=await allUser.findOne({username:username});
    let allQues=await allQuestion.find();
    let queLen=allQues.length;
    let easyQue=await allQuestion.find({level:"easy"});
    let medQue=await allQuestion.find({level:"medium"});
    let hrdQue=await allQuestion.find({level:"hard"});
    let easyPer=((userData.easySol/easyQue.length)*100).toFixed(1);
    let mediumPer=((userData.mediumSol/medQue.length)*100).toFixed(1);
    let hardPer=((userData.hardSol/hrdQue.length)*100).toFixed(1);
    res.render("userPage.ejs",{userData,easyPer,mediumPer,hardPer,queLen});
}));

// show question...
app.get('/LetsCode/:id/topic/:Qtype',wrapAsync(async(req,res,next)=>{
    let {Qtype,id}=req.params;
    let ques=await allQuestion.find({topic:Qtype});
    let userData=await allUser.findById(id);
    res.render('questionPage.ejs',{ques,id,userData})
}));

// marked sas done...
app.put('/LetsCode/:id/:qId/solved/:solvedType',wrapAsync(async(req,res,next)=>{
    let {id,qId,solvedType}=req.params;
    let findData=await allUser.findById(id);
    let findQue=await allQuestion.findById(qId);
    let qLevel=findQue.level;
    let solvedTotal=findData.solvedQues+1;
    let occur=false;
    if(qLevel==="easy"){
        let solved=findData.easySol+1;
        let allEasy=await allUser.findById(id);
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
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,easySol:solved,$push: { easyId: qId }});
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
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,mediumSol:solved,$push: { mediumId: qId }});
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
            let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,hardSol:solved,$push: { hardId: qId }});
            updateData.save();
            if(solvedType==="topicSolved"){
                req.flash("success","Great! You have solved one more question.");
            }else{
                req.flash("success","Well done! You've solved the question that was randomly generated.");
            }
        }
    }
    if(solvedType==="topicSolved"){
        res.redirect(`/LetsCode/${id}/topic/${findQue.topic}`);
    }else{
        res.redirect(`/LetsCode/user/${findData.username}`);
    }
}));

//random question...
app.put('/LetsCode/randomQue/Pick/:id',wrapAsync(async(req,res,next)=>{
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
    res.redirect(`/LetsCode/randomQue/${randomQuestionId}/Picked/user/${id}/`);
}));

// random Question page render...
app.get('/LetsCode/randomQue/:qId/Picked/user/:id/',wrapAsync(async(req,res,next)=>{
    let{qId,id}=req.params;
    let userData=await allUser.findById(id);
    let randomQuestion=await allQuestion.findById(qId);
    res.render(`randomQuestionPage.ejs`,{randomQuestion,userData});
}))







app.all("*",(req,res,next)=>{
    next(new expressError(404,"Page Not Found !"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong..."}=err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
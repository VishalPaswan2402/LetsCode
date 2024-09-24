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
const mongoose = require('mongoose');
const allUser=require('./models/user');
const allQuestion=require('./models/allQuestion');
// const allQuestionList=require('./middlewares/saveQuestions')

mongoose.connect('mongodb://127.0.0.1:27017/LetsCode')
  .then(() => console.log('Connected! to mongoose'));

// Home page...
app.get('/',(req,res)=>{
    res.render("homePage.ejs");
});

// signup page...
app.post('/LetsCode/Signup',async(req,res)=>{
    let{username,name,email,password1,password2}=req.body;
    let newUser= new allUser({username:username,name:name,email:email,password:password1});
    await newUser.save();
    res.redirect(`/LetsCode/user/${username}`);
});

// login...
app.post('/LetsCode/login',async(req,res)=>{
    let{username,password}=req.body;
    let currentUser=await allUser.findOne({username:username,password:password});
    res.redirect(`/LetsCode/user/${currentUser.username}`);
});


// userpage...
app.get('/LetsCode/user/:username',async(req,res)=>{
    let{username}=req.params;
    let userData=await allUser.findOne({username:username});
    let easyPer=((userData.easySol/12)*100).toFixed(1);
    let mediumPer=((userData.mediumSol/10)*100).toFixed(1);
    let hardPer=((userData.hardSol/8)*100).toFixed(1);
    res.render("userPage.ejs",{userData,easyPer,mediumPer,hardPer});
});

// show question...
app.get('/LetsCode/:id/topic/:Qtype',async(req,res)=>{
    let {Qtype,id}=req.params;
    let ques=await allQuestion.find({topic:Qtype});
    let userData=await allUser.findById(id);
    res.render('questionPage.ejs',{ques,id,userData})
});

// marked sas done...
app.put('/LetsCode/:id/:qId/solved/:solvedType',async(req,res)=>{
    let {id,qId,solvedType}=req.params;
    // console.log(solvedType);
    let findData=await allUser.findById(id);
    let findQue=await allQuestion.findById(qId);
    let qLevel=findQue.level;
    let solvedTotal=findData.solvedQues+1;
    if(qLevel==="easy"){
        let solved=findData.easySol+1;
        let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,easySol:solved,$push: { easyId: qId }});
        updateData.save();
    }else if(qLevel==="medium"){
        let solved=findData.mediumSol+1;
        let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,mediumSol:solved,$push: { mediumId: qId }});
        updateData.save();
    }else{
        let solved=findData.hardSol+1;
        let updateData=await allUser.findByIdAndUpdate(id,{solvedQues:solvedTotal,hardSol:solved,$push: { hardId: qId }});
        updateData.save();
    }
    if(solvedType==="topicSolved"){
        res.redirect(`/LetsCode/${id}/topic/${findQue.topic}`)
    }else{
        res.redirect(`/LetsCode/user/${findData.username}`)
    }
});

//random question...
app.put('/LetsCode/randomQue/Pick/:id',async(req,res)=>{
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
    // res.render(`randomQuestionPage.ejs`,{randomQuestion,userData});
    res.redirect(`/LetsCode/randomQue/${randomQuestionId}/Picked/user/${id}/`)
});

// random Question page render...
app.get('/LetsCode/randomQue/:qId/Picked/user/:id/',async(req,res)=>{
    let{qId,id}=req.params;
    // console.log(qId,id);
    let userData=await allUser.findById(id);
    let randomQuestion=await allQuestion.findById(qId);
    // console.log(randomQuestion);
    res.render(`randomQuestionPage.ejs`,{randomQuestion,userData});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
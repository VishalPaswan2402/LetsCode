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

mongoose.connect('mongodb://127.0.0.1:27017/LetsCode')
  .then(() => console.log('Connected! to mongoose'));

// Home page...
app.get('/',(req,res)=>{
    res.render("homePage.ejs");
})

// signup page...
app.post('/LetsCode/Signup',async(req,res)=>{
    let{username,name,email,password1,password2}=req.body;
    console.log(username,name,email,password1,password2);
    let newUser= new allUser({username:username,name:name,email:email,password:password1});
    await newUser.save();
    res.redirect(`/LetsCode/user/${username}`);
});

// login...
app.post('/LetsCode/login',async(req,res)=>{
    let{username,password}=req.body;
    let currentUser=await allUser.findOne({username:username,password:password});
    // console.log(currentUser);
    res.redirect(`/LetsCode/user/${currentUser.username}`);
})


// userpage...
app.get('/LetsCode/user/:username',async(req,res)=>{
    let{username}=req.params;
    console.log(username);
    let userData=await allUser.findOne({username:username});
    console.log(userData);
    res.render("userPage.ejs",{userData});
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
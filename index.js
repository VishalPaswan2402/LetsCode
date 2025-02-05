const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const expressError = require('./utility/expressError');
const mongoose = require('mongoose');
const allUser = require('./models/user');

// save questions and profile db
// const allQuestionList=require('./middlewares/saveQuestions');
// const allProfileDp=require('./middlewares/saveProfileDp');

const loginLogout = require('./routes/loginLogout');
const signup = require('./routes/signup');
const sendOtp = require('./routes/sendOtp');
const reSendOtp = require('./routes/reSendOtp');
const verifyOtp = require('./routes/verifyOtp');
const showAndDone = require('./routes/showAndDone');
const userPage = require('./routes/userPage');
const randomQuestion = require('./routes/randomQuestion');
const forgetPassword = require('./routes/forgotPassword');
const changePassword = require('./routes/changePassword');
const profileImage = require('./routes/profileImage');
const passport = require("passport");
const LocalStrategy = require("passport-local");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    crypto: {
        secret: process.env.SECREAT_PASS || 'letscodeindia'
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongoos session...", err);
})

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const sessionOption = {
    secret: process.env.SECREAT_PASS || 'letscodeindia',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(allUser.authenticate()));
passport.serializeUser(allUser.serializeUser());
passport.deserializeUser(allUser.deserializeUser());

mongooseFunction()
    .then(() => {
        console.log("Connected to database...")
    })
    .catch((err) => {
        console.log(err);
    });
async function mongooseFunction() {
    await mongoose.connect(process.env.MONGODB_URL);
};

var flash = require('connect-flash');
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUsers = req.user;
    next();
});

//Routes
app.use('/LetsCode', loginLogout);
app.use('/LetsCode', loginLogout);
app.use('/LetsCode', signup);
app.use('/LetsCode', sendOtp);
app.use('/LetsCode', reSendOtp);
app.use('/LetsCode', verifyOtp);
app.use('/LetsCode/:id', showAndDone);
app.use('/LetsCode/user', userPage);
app.use('/LetsCode/randomQue', randomQuestion);
app.use('/LetsCode/Forget/Password', forgetPassword);
app.use('/LetsCode/Forget/Password', changePassword);
app.use('/LetsCode/Change/Profile', profileImage);
//Routes

// Home page...
app.get('/', async (req, res) => {
    let id = req.session.userId;
    if (id) {
        console.log("FInd");
        let data = await allUser.findById(id);
        return res.redirect(`/LetsCode/user/${data.username}`);
    }
    return res.render("homePage.ejs");
});

// Error handle for invalid router...
app.all("*", (req, res, next) => {
    next(new expressError(404, "Page Not Found !"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong..." } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
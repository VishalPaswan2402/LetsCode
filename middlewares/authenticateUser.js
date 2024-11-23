const allUser = require("../models/user");

module.exports.isLoggedIn=async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in.");
        return res.redirect("/");
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let nowUser=await allUser.findById(id);
    if(!nowUser._id.equals(req.session.userId)){
        req.flash("error","Please login to your account.");
        return res.redirect('/');
    }
    next();
};

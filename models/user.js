const {model}=require ('mongoose');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const allUser=mongoose.model("allUser",userSchema);
module.exports=allUser;
const { number } = require('joi');
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
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        require:true
    },
    rank:{
        type:Number,
        require:true
    },
    solvedQues:{
        type:Number,
        default:0
    },
    easySol:{
        type:Number,
        default:0
    },
    mediumSol:{
        type:Number,
        default:0
    },
    hardSol:{
        type:Number,
        default:0
    },
    easyId:{
        type:[String],
        default:[]
    },
    mediumId:{
        type:[String],
        default:[]
    },
    hardId:{
        type:[String],
        default:[]
    }
});

const allUser=mongoose.model("allUser",userSchema);
module.exports=allUser;
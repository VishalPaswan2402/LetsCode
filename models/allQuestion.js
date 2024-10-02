const {model}=require ('mongoose');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const allQuestionSchema=new Schema({
    questionName:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    urlLink:{
        type:String,
        required:true
    }
});

const allQuestion=mongoose.model("allQuestion",allQuestionSchema);
module.exports=allQuestion;
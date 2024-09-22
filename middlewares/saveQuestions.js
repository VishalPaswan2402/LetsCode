const questionModel=require('../models/allQuestion');
const questionList=require('../models/allQuestionList');
const saveQueList=questionList.forEach((que)=>{
    const newQue=new questionModel({
        idNo:que.idNo,
        questionName:que.questionName,
        topic:que.topic,
        level:que.level,
        urlLink:que.urlLink,
        done:que.done
    });
    newQue.save()
    .then(savedQue=>{
        console.log("Saved");
    })
    .catch(error=>{
        console.log("Some Error");
    });
});

module.exports={saveQueList};
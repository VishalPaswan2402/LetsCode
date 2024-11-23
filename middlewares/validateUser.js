const {userSchema}=require('../middlewares/schemaValidate');
const expressError=require('../utility/expressError');

module.exports.validateUser=(req,res,next)=>{
    let{error}=userSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }
    else{
        next();
    }
};
const Joi= require('joi');

module.exports.userSchema=Joi.object({
    username:Joi.string().required(),
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    password2:Joi.string().required()
});
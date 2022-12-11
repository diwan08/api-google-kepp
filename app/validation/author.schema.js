const Joi = require("joi")

module.exports = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "name cannot be empty",
            "string.base": "name must be a text",
            "string.empty": "name cannot be empty"
        
         }),
    birthdate: Joi.date()
        .required()
        .messages({
            "any.required": " tanggal lahir cannot be a empty",
            "string.base":"tanggl lahir must be number"
        }),
    gender: Joi.string()
        .required()
        .valid("L","P")
        .messages({
            "any.required": "gender cannot be empty",
            "string.base": "gender must be a text",
            "string.empty": "gender cannot be empty"
        }),
    address: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "nameaddress cannot be empty",
            "string.base": "address must be a text",
            "string.empty": "address cannot be empty"
        })

}) 
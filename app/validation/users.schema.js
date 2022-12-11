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
    no_telp: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "no_telp cannot be empty",
            "string.base": "no_telp must be a text",
            "string.empty": "no_telp cannot be empty"
        }),
    address: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "address cannot be empty",
            "string.base": "address must be a text",
            "string.empty": "address cannot be empty"
        }),
    email: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "email cannot be empty",
            "string.base": "email must be a text",
            "string.empty": "email cannot be empty"
        }),
    password: Joi.string()
        .min(8)
        .max(20)
        .trim()
        .required()
        .trim()
        .messages({
            "any.required": "password cannot be empty",
            "string.base": "password must be a text",
            "string.empty": "password cannot be empty"
        }),
    role: Joi.string()
        .required()
        .valid("admin","member")
        .trim()
        .messages({
            "any.required": "role cannot be empty",
            "string.base": "role must be a text",
            "string.empty": "role cannot be empty"
        })
})
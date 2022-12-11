const Joi = require("joi")

module.exports= Joi.object({
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
})
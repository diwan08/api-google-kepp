const Joi = require("joi")

module.exports = Joi.object({
    category :Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "category cannot be empty",
            "string.base": "category must be a text",
            "string.empty": "category cannot be empty"
        })
})
const Joi = require("joi")

module.exports= Joi.object({
    title: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "title cannot be empty",
            "string.base": "title must be a text",
            "string.empty": "title cannot be empty"
        }),
    description: Joi.string()
        .required()
        .trim()
        .messages({
            "any.required": "description cannot be empty",
            "string.base": "description must be a text",
            "string.empty": "description cannot be empty"
        }),
    publisher: Joi.string()
        .required()
        .trim()
        .messages({
        "any.required": "publisher cannot be empty",
        "string.base": "publisher must be a text",
        "string.empty": "publisher cannot be empty"
            }),
    publish_at: Joi.date()
        .required()
        .messages({
            "any.required": "publish_at cannot be a empty",
            "string.base": "publish_at must be number"
        }),
    author_id:Joi.number()
        .required()
        .integer()
        .messages({
            "any.required": "author_id cannot be empty",
            "number.base": "author_id must be a number",
            "number.empty": "author_id cannot be empty"
        }),
    category_id: Joi.number()
        .required()
        .integer()
        .messages({
            "any.required": "category cannot be empty",
            "number.base": "category must be a number",
            "number.empty": "category cannot be empty"
        })
})
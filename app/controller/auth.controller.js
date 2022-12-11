require("dotenv").config
const loginSchema = require("../validation/login.schema")
const bcrypt = require("bcrypt")
const db = require("../../databases/index")
const jwt = require("jsonwebtoken")
const {Api400Error, Api403Error, Api404Error,Api422Error, Api401Error} = require("../middlewares/errors/ApiError")

module.exports= class authController{
    static async createLogin(req, res, next){
        try {
            const {error, value} = loginSchema.validate(req.body)
            if (error) {
                throw new Api422Error("validate error", error.details)
            }
            const user = await db("users")
                .where({email : value.email})
                .first()
                .catch(error =>{
                    throw new Api400Error(error.message)
                })

            if (!user) {
                throw new Api401Error("email don't registred")
            } else if(!bcrypt.compareSync(value.password, user.password)){
                throw new Api400Error("wrong password")
            }
            // generate token
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            },process.env.JWT_SECRET_KEY,{
                expiresIn:"1h"
            })

            return res.json({
                success:true,
                message:("user successfully logged in"),
                token
            })
        } catch (error) {
            next(error)
        }
    }
}
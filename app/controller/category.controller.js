const db = require("../../databases")
const categorySchema = require("../validation/category.schema")
const {
    ApiError400,
    ApiError403,
    ApiError404,
    ApiError422} = require("../middlewares/errors/ApiError")

module.exports = class categoryController{
    static async create(req, res, next){
        try {
            const{ error, value}= categorySchema.validate(req.body)
            if (error) {
                throw new ApiError422("validations error".error.details)
            }
            const {category}= value;
            await db.transaction(async function(trx){

                await db("categories")
                    .transacting(trx)
                    .insert({category})
                    .catch(trx.rollback)

                trx.commit
            })

            return res.json({
                success: true,
                message: "data successfuly"
            })
        } catch (error) {
            next(error)
        }
    }
    static async getAll(req, res, next) {
        try {
          const { page = 1, limit = 25, seacrh = "" } = req.query;
    
          const category = await db("categories")
            
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .where("id", "like", `%${seacrh}`);
    
          return res.json({
            success: true,
            message: "data successfuly retrieved",
            category,
          });
        } catch (error) {
          next(error);
        }
      }
      static async getDetail(req, res, next) {
        try {
          // req data from params
          const { id } = req.params;
          // return console.log(req.params.id);
    
          const data = await db("categories")
            .select(
              "id",
              "category",
              "created_at",
              "updated_at"
            )
            .where({ id: id })
            .first();
    
          if (!data) {
            // throw new ApiError404(`user with id ${id} not found`)
           return res.status(404).json({
            status: false,
            message: `category by id ${id} not found`
           })
          }
    
          return res.status(201).json({
            success: true,
            message: "data successfuly retrieved",
            data
          });
        } catch (error) {
          next(error);
        }
      }
      static async update(req, res, next){
        try {
          const { error, value } = categorySchema.validate(req.body);
              if (error) {
                // throw new Api422Error("validation error",error.details);
                return res.status(422).json({
                  status: false,
                  message: error.message
                 })
              }
          const { id } = req.params;
          const data = await db("categories").where({ id }).first();
              if (!data) {
                throw new Api404Error("data is not found");
              }
                
          await db.transaction(async function(trx) {
            // update data category
            await db("categories")
              .where({ id })
              .transacting(trx)
              .update(value)
              .catch(trx.rollback);
    
            trx.commit;
          });
          return res.json({
              succes:true,
              mesagge: " success update category"
          })
        } catch (error) {
          next(error)
        }
      }
      static async delete(req, res, next){
        try {
          const { id }= req.params
    
          const data= await db("categories")
          .del()
          .where({ id })
          if (!data) {
            return res.status(404).json({
              status: false,
              message: "category not found"
            })
          }
    
          return res.json({
            success: true,
            message: "delete data successfuly"
          })
        } catch (error) {
          next(error)
        }
      }
}
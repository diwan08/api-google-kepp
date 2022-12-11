const db =require("../../databases")
const authorSchema = require("../validation/author.schema")
const {
    Api400Error,
    Api403Error,
    Api422Error,
    Api404Error,
} = require("../middlewares/errors/ApiError")

module.exports = class authorController{
    static async createAuth(req, res, next){
        try {
            const {error, value} = authorSchema.validate(req.body)
            if (error) {
                throw new ApiError422("validate error", error.details)
            }
            const {name, birthdate,gender, address }= value;
            await db.transaction(async function(trx){

                // insert data to db
                await db("authors")
                    .transacting(trx)
                    .insert({
                        name,
                        birthdate,
                        gender,
                        address
                    })
                    .catch(trx.rollback)
                trx.commit
            })

            return res.json({
                success: true,
                message: "data sucessfully retrived"
            })
        } catch (error) {
            next(error)
        }
    }
    static async getAll(req, res, next) {
        try {
          const { page = 1, limit = 25, seacrh = "" } = req.query;
    
          const user = await db("authors")
            .select(
              "id",
              "name",
              "birthdate",
              "gender",
              "address",
              "created_at",
              "updated_at"
            )
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .where("name", "like", `%${seacrh}`);
    
          return res.json({
            success: true,
            message: "data successfuly retrieved",
            user,
          });
        } catch (error) {
          next(error);
        }
    }
    static async getDetail(req, res, next){
        try {
             // req data from params
      const { id } = req.params;
      // return console.log(req.params.id);

      const data = await db("authors")
        .select(
            "id",
            "name",
            "birthdate",
            "gender",
            "address",
            "created_at",
            "updated_at"
        )
        .where({ id: id })
        .first();

      if (!data) {
      throw new Api404Error(`author with id ${id} not found`)
      }

      return res.status(201).json({
        success: true,
        message: "data successfuly retrieved",
        data
      });
        } catch (error) {
            next(error)
        }
    }
    static async update(req, res, next){
        try {
            const { error, value } = authorSchema.validate(req.body);
            if (error) {
            throw new Api422Error("validation error",error.details);
            }
        const { id } = req.params;
        const data = await db("authors").where({ id }).first();
            if (!data) {
              throw new Api404Error("data is not found");
            }
              
        await db.transaction(async function(trx) {
          // update data category
          await db("authors")
            .where({ id })
            .transacting(trx)
            .update(value)
            .catch(trx.rollback);
  
          trx.commit;
        });
        return res.json({
            succes:true,
            mesagge: " success update author"
        })
      } catch (error) {
        next(error)
      }
    }
    static async delete(req, res, next){
      try {
        const { id }= req.params
        const data = await db("authors").where({books_id: id}).first()
        if (!data) {
          throw new Api404Error("data is not found")
        }
        await db("authors")
        .where({ id })
        .del()
  
        return res.json({
          success: true,
          message: "delete data successfuly"
        })
        } catch (error) {
            next(error)
        }
    }
}
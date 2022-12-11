const db = require("../../databases")
const bookSchema = require("../validation/book.schema")
const {
    Api400Error,
    Api403Error,
    Api404Error,
    Api422Error
} = require("../middlewares/errors/ApiError")
module.exports = class bookController{
    static async createBook(req, res , next){
        try {
            const{error, value} = bookSchema.validate(req.body)
            if (error) {
                throw new Api422Error("validate error", error.details)
            }
            const{title ,description, publisher, publish_at}= value;

            await db.transaction(async function(trx){


                await db("books")
                    .transacting(trx)
                    .insert({
                        title ,
                        description,
                        publisher,
                        publish_at
                    })
                    .catch(trx.rollback)
                trx.commit

            })

                return res.json({
                    success: true,
                    message: "data succesfully retrieved",
                    
                })
        } catch (error) {
            next(error)
        }
    }
    static async getAll(req, res, next){
        try {
            const {page = 1, limit= 25, seacrh= "", order="asc"} =req.query
            const book = await db("books as b")
                .leftJoin("categories as c", "c.id", "b.category_id")
                .leftJoin("authors as a", "a.id","b.author_id")
                .select("b.books_id","b.title","b.publisher","b.publish_at","a.birthdate","c.category","a.name")
                .limit(+limit)
                .offset(+page * +limit - +limit)
                .orderBy("b.created_at", order)
                .where("b.title", "like", `%${seacrh}`)


                return res.json({
                    success: true,
                    message: "data updated",
                    book
                })
        } catch (error) {
            next(error)
        }
    }
    static async updateBook(req, res, next){
        try {
            const { id } = req.params;
      // validation data
            const { error, value } = bookSchema.validate(req.body);
      if (error) {
        throw new Api422Error("validation error", error.details);
      }

      // cek id books
      const book = await db("books")
        .where({ books_id:id })
        .first();
      if (!book) {
        throw new Api404Error("id book not found");
      }

      const {
        title,
        description,
        publisher,
        publish_at,
        author_id,
        category_id
      } = value;

      // update data siswa
      await db("books").where({ books_id:id }).update({
        title,
        description,
        publisher,
        publish_at,
        author_id,
        category_id
      }).catch(err =>{
        throw new Api404Error(err)
      })

    
          return res.json({
            success: true,
            message: "data siswa successfully Update",
          });
        } catch (error) {
            next(error)
        }
    }
    static async deleteBook(req, res, next){
       try {
        const { id }= req.params;
        const data = await db("books").where({books_id: id}).first()
        if (!data) {
            throw new Api404Error("book not found")
        }
        await db("books")
            .del()
            .where({books_id: id})
            
        return res.json({
            success: true,
            message:" successfully delete"
        })
       } catch (error) {
            next(error)
       }
    }
}
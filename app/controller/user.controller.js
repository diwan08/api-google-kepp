const db = require("../../databases");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userSchema = require("../validation/users.schema");
const {
  Api400Error,
  Api403Error,
  Api404Error,
  Api422Error
} = require("../middlewares/errors/ApiError");

module.exports = class userController {
  static async createUser(req, res, next) {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        throw new Api422Error("validate error", error.details);
      }

      const { name, birthdate, no_telp, address, email, password, role } =
        value;
      await db("users").insert({
        id: crypto.randomUUID(),
        name,
        birthdate,
        no_telp,
        address,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      });
      return res.status(201).json({
        success: true,
        message: "data user successfully created",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const { page = 1, limit = 25, seacrh = "" } = req.query;

      const user = await db("users")
        .select(
          "id",
          "name",
          "address",
          "birthdate",
          "no_telp",
          "email",
          "password",
          "role",
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
  static async getDetail(req, res, next) {
    try {
      // req data from params
      const { id } = req.params;
      // return console.log(req.params.id);

      const data = await db("users")
        .select(
          "id",
          "name",
          "address",
          "birthdate",
          "no_telp",
          "email",
          "password",
          "role",
          "created_at",
          "updated_at"
        )
        .where({ id: id })
        .first();

      if (!data) {
      throw new Api404Error(`user with id ${id} not found`)
      //  return res.status(404).json({
      //   status: false,
      //   message: `user by id ${id} not found`
      //  })
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
      const { error, value } = userSchema.validate(req.body);
          if (error) {
          throw new Api422Error("validation error",error.details);
            
          }
      const { id } = req.params;
      const user = await db("users").where({ id }).first();
          if (!user) {
            throw new Api404Error("user is not found");
          }
            
      await db.transaction(async function(trx) {
        // update data user
        await db("users")
          .where({ id })
          .transacting(trx)
          .update(value)
          .catch(trx.rollback);

        trx.commit;
      });
      return res.json({
          succes:true,
          mesagge: " success update user"
      })
    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next){
    try {
      const { id }= req.params

      const user= await db("users")
      .del()
      .where({ id })
      if (!user) {
        throw new Api422Error("validate error")
      }

      return res.json({
        success: true,
        message: "delete data successfuly"
      })
    } catch (error) {
      next(error)
    }
  }
};

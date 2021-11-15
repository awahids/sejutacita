const Users = require("../models/users.model");
const { authHash } = require("../middlewares/auth");
const Joi = require("joi");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, username, password, role } = req.body;

      const schema = Joi.object({
        name: Joi.string().alphanum().required(),
        username: Joi.string().alphanum().min(6).max(8).required(),
        password: Joi.string().min(8).required(),
      });

      const { error } = schema.validate({ ...body }, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "input uncorectly",
          error: error["details"][0]["message"],
        });
      }

      const checkUsername = await Users.findOne({ username: username });

      if (checkUsername) {
        return res.status(400).json({
          status: "status",
          message: `this username ${username} address is already associated with another account`,
        });
      }

      const hashPass = await authHash(password);

      const signUp = await Users.create({
        name,
        username,
        password: hashPass,
        role,
      });

      if (!signUp) {
        return res.status(400).json({
          status: "Failed",
          message: "Cannot signup",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success signup",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  signIn = async(req, res) => {
    const {username, password} = req.body;
    const body = req.body

    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        })

        const {error} = schema.validate({...body})

        if(error){
            return res.status(400).json({
                status: "Failed",
                message: "Invalid email or password",
                error: error["details"][0]["message"]
            });
        }

        const checkUsername = await Users.findOne({username: username})

        if (!checkUsername) {
            return res.status(400).json({});
        }


    } catch (error) {
        
    }
  }
};

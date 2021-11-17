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
        name: Joi.string().required(),
        username: Joi.string().min(6).max(8).required(),
        password: Joi.string().min(8).required(),
        role: Joi.string()
      });

      const { error } = schema.validate({
        name: name,
        username: username,
        password: password,
        role: role
      }, { abortEarly: false });

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

      const hashPassword = await authHash(password);

      const signUp = await Users.create({
        name,
        username,
        password: hashPassword,
        role
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
        data: signUp
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  signIn: async(req, res) => {
    const {username, password} = req.body;
    const body = req.body

    try {
        const checkUsername = await Users.findOne({username: username})

        if (!checkUsername) {
            return res.status(400).json({
              status: "Failed",
              message: "Invalid username"
            });
        }

      const checkPassword = await Bcrypt.compare(body.password, checkUsername.password)
      
      if (!checkPassword) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid password"
        });
      }

      const payload = {
          username: checkUsername.username,
          id: checkUsername._id,
      };

      Jwt.sign(payload, process.env.PWD_TOKEN, { expiresIn: 3600 * 24 }, (err, token) => {
        return res.status(200).json({
          status: "Success",
          message: "Sign In successfully",
          data: token
        });
      })

    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error"
      })
    }
  }
};

const { string } = require("joi");
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = Users = Mongoose.model("Users", UsersSchema);

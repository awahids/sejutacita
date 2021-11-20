const jwt = require("jsonwebtoken");
const Users = require("../models/users.model");

module.exports = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  const token = bearerToken.replace("Bearer ", "");
  const decode = jwt.verify(token, process.env.PWD_TOKEN);
  req.user = decode;
  const user = req.user;

  try {
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Authorization denied! please login",
      });
    }

    const userAdmin = await Users.findById({ _id: user.id });
    if (!userAdmin) {
      return res.status(400).json({
        status: "failed",
        message: "No Admin found in database",
      });
    }

    if (userAdmin.role != "admin") {
      return res.status(401).json({
        status: "failed",
        message: "You are not Admin",
      });
    }

    next();
  } catch (error) {
    console.log("🚀 ~ file: authorization.js ~ line 36 ~ module.exports= ~ error", error)
    return res.status(500).json({
      status: "failed",
      message: "Invalid Token !",
    });
  }
};

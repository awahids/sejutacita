const Users = require("../models/users.model");

module.exports = {
  showUsersList: async (req, res) => {
    try {
      const findUsers = await Users.find({});

      if (!findUsers) {
        return res.status(200).json({
          status: "Success",
          message: "Data is empty",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Retrive data is success",
        data: findUsers,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  updateUsers: async (req, res) => {
    const user = req.user;
    const body = req.body;
    try {
      const findUser = await Users.findById(user.id);

      if (!findUser) {
        return res.status(400).json({
          status: "Failed",
          message: "You cannot edit other users",
        });
      }

      findUser.name = body.name ? body.name : findUser.name;
      findUser.password = body.password ? body.password : findUser.password;

      await findUser.save();
      return res.status(400).json({
        status: "Failed",
        message: "Success edit profile",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },
};

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
      const userUpdate = await Users.findById(user.id);

      if (!userUpdate) {
        return res.status(400).json({
          status: "Failed",
          message: "You cannot edit other users",
        });
      }

      userUpdate.name = body.name ? body.name : userUpdate.name;
      userUpdate.password = body.password ? body.password : userUpdate.password;

      await userUpdate.save();
      return res.status(400).json({
        status: "Failed",
        message: "Success update profile",
        data: userUpdate,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    try {
      const deleteUser = await Users.findById(id);

      if (!deleteUser) {
        return res.status(404).json({
          message: "User not Found",
        });
      }

      await deleteUser.findByIdAndRemove(id);
      res.status(200).json({
        status: "success",
        message: "user success delete",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  currentUser: async (req, res) => {
    const id = req.user.id;

    try {
      const findUser = await Users.findById(id);

      return res.status(200).json({
        status: "success",
        message: "Success Retrieved Data",
        data: findUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  showUserById: async (req, res) => {
    const id = req.params.id;

    try {
      const userId = await Users.findById(id);

      if (!userId) {
        return res.status(400).json({
          status: "failed",
          message: "cannot find user",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success retrieved user",
        data: userId,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },
};

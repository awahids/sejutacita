const express = require("express");
const router = express.Router();
const user = require("../controllers/users.controller");
const { authToken } = require("../middlewares/auth");
const authAdmin = require("../middlewares/authorization");

router.get("/me", authToken, user.currentUser);
router.get("/listusers", authToken, authAdmin, user.showUsersList);
router.get("/:id", authToken, authAdmin, user.showUserById);
router.put("/", authToken, user.updateUsers);
router.put("/edit/:id", authAdmin, user.updateUserById);
router.delete("/:id", authAdmin, user.deleteUser);

module.exports = router;

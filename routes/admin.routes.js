const express = require("express");
const router = express.Router();
const admin = require("../controllers/users.controller");
const { authToken } = require("../middlewares/auth");
const authAdmin = require("../middlewares/authorization");

router.get("/", authToken, authAdmin, admin.currentUser);
router.put("/", authToken, authAdmin, admin.updateUsers);
router.delete("/:id", authToken, authAdmin, admin.deleteUser);

module.exports = router;

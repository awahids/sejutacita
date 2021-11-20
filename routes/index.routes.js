const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const usersRouter = require("./user.routes");
const adminRouter = require("./admin.routes");

router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/admin", adminRouter);

module.exports = router;

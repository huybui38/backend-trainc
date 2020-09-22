const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");
const groupsRouter = require("./groups");
const notificationsRouter = require("./notifications");

router.use("/users", usersRouter);
router.use("/courses", coursesRouter);
router.use("/groups", groupsRouter);
router.use("/notifications", notificationsRouter);

module.exports = router;

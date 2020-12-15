const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");
const groupsRouter = require("./groups");
const notificationsRouter = require("./notifications");
const exercisesRouter = require("./exercises");
const submitsRouter = require("./submits");

router.use("/users", usersRouter);
router.use("/courses", coursesRouter);
router.use("/groups", groupsRouter);
router.use("/notifications", notificationsRouter);
router.use("/exercises", exercisesRouter);
router.use("/submits", submitsRouter);
module.exports = router;

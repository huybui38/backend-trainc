const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const create_course = require("../controllers/courses/create.course");
const update_course = require("../controllers/courses/update.course");
const delete_course = require("../controllers/courses/delete.course");
const getAll_course = require("../controllers/courses/getAll.course");
const getGroups_course = require("../controllers/courses/getGroups.course");
const getNotifications_course = require("../controllers/courses/getNotifications.course");
const getExercises_course = require("../controllers/courses/getExercises.course");

router.get("/:id/groups", auth, getGroups_course);
router.get("/:id/notifications", auth, getNotifications_course);
router.get("/:id/exercises", auth, isMentor, isAdmin, getExercises_course);
router.put("/:id", auth, isAdmin, update_course);
router.delete("/:id", auth, isAdmin, delete_course);
router.post("/", auth, isAdmin, create_course);
router.get("/", auth, getAll_course);

module.exports = router;

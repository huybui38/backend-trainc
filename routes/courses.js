const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_course = require("../controllers/courses/create.course");
const update_course = require("../controllers/courses/update.course");
const delete_course = require("../controllers/courses/delete.course");

router.post("/", auth, isAdmin, create_course);
router.put("/:name", auth, isAdmin, update_course);
router.delete("/:name", auth, isAdmin, delete_course);

module.exports = router;

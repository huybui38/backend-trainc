const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_course = require("../controllers/courses/create.course");

router.post("/", auth, isAdmin, create_course);

module.exports = router;

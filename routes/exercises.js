const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const create_exercise = require("../controllers/exercises/create.exercise");
const update_exercise = require("../controllers/exercises/update.exercise");
const get_exercise = require("../controllers/exercises/get.exercise");
const getAll_exercise = require("../controllers/exercises/getAll.exercise");

router.get("/", auth, isMentor, isAdmin, getAll_exercise);
router.post("/", auth, isMentor, isAdmin, create_exercise);
router.put("/:code", auth, isMentor, isAdmin, update_exercise);
router.get("/:code", auth, isMentor, isAdmin, get_exercise);

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_exercise = require("../controllers/exercises/create.exercise");
const update_exercise = require("../controllers/exercises/update.exercise");
const get_exercise = require("../controllers/exercises/get.exercise");

router.post("/", auth, isAdmin, create_exercise);
router.put("/:code", auth, isAdmin, update_exercise);
router.get("/:code", auth, isAdmin, get_exercise);

module.exports = router;

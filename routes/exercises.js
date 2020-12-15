const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const create_exercise = require("../controllers/exercises/create.exercise");
const update_exercise = require("../controllers/exercises/update.exercise");
const get_exercise = require("../controllers/exercises/get.exercise");
const getAll_exercise = require("../controllers/exercises/getAll.exercise");
const changeStatus_exercise = require("../controllers/exercises/changeStatus.exercise");

router.get("/", auth, isMentor, getAll_exercise);
router.post("/", auth, isMentor, create_exercise);
router.put("/:id", auth, isMentor, update_exercise);
router.get("/:id", auth, get_exercise);
router.put("/:id/status", auth, isMentor, changeStatus_exercise);

module.exports = router;

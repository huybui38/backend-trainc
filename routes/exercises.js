const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_exercise = require("../controllers/exercises/create.exercise");

router.post("/", auth, isAdmin, create_exercise);

module.exports = router;

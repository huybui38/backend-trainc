const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_group = require("../controllers/groups/create.group");

router.post("/", auth, isAdmin, create_group);

module.exports = router;

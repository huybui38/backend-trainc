const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_group = require("../controllers/groups/create.group");
const delete_group = require("../controllers/groups/delete.group");
const enroll_group = require("../controllers/groups/enroll.group");

router.post("/:id", auth, enroll_group);
router.delete("/:id", auth, isAdmin, delete_group);
router.post("/", auth, isAdmin, create_group);

module.exports = router;

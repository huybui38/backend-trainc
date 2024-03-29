const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const create_group = require("../controllers/groups/create.group");
const delete_group = require("../controllers/groups/delete.group");
const enroll_group = require("../controllers/groups/enroll.group");
const kick_group = require("../controllers/groups/kickMember.group");
const get_group = require("../controllers/groups/get.group");
const update_group = require("../controllers/groups/update.group");

router.delete("/:id/members", auth, isAdmin, kick_group);
router.post("/:id", auth, enroll_group);
router.delete("/:id", auth, isAdmin, delete_group);
router.put("/:id", auth, isMentor, update_group);
router.get("/:id", auth, get_group);
router.post("/", auth, isMentor, create_group);

module.exports = router;

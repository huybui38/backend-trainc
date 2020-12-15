const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const create_notification = require("../controllers/notifications/create.notification");
const update_notification = require("../controllers/notifications/update.notification");
const delete_notification = require("../controllers/notifications/delete.notification");
const get_notification = require("../controllers/notifications/getAll.notification");

router.put("/:id", auth, isMentor, update_notification);
router.delete("/:id", auth, isMentor, delete_notification);
router.post("/", auth, isMentor, create_notification);
router.get("/", auth, isMentor, get_notification);

module.exports = router;

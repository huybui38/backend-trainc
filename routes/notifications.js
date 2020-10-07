const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_notification = require("../controllers/notifications/create.notification");
const update_notification = require("../controllers/notifications/update.notification");
const delete_notification = require("../controllers/notifications/delete.notification");
const get_notification = require("../controllers/notifications/getAll.notification");

router.put("/:id", auth, isAdmin, update_notification);
router.delete("/:id", auth, isAdmin, delete_notification);
router.post("/", auth, isAdmin, create_notification);
router.get("/", auth, isAdmin, get_notification);

module.exports = router;

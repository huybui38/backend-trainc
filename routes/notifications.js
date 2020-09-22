const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const create_notification = require("../controllers/notifications/create.notification");
const update_notification = require("../controllers/notifications/update.notification");

router.post("/", auth, isAdmin, create_notification);
router.put("/:id", auth, isAdmin, update_notification);

module.exports = router;

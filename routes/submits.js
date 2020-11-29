const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");
const upload_submit = require("../controllers/submit/upload.submit");
const getAll_submit = require("../controllers/submit/getAll.submit");
const update_submit = require("../controllers/submit/update.submit");

router.post("/:id", auth, upload, upload_submit);
router.put("/:id", auth, isAdmin, update_submit);
router.get("/", auth, isAdmin, getAll_submit);

module.exports = router;

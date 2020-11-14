const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload_submit = require("../controllers/submit/upload.submit");

router.post("/:id", auth, isAdmin, upload_submit);

module.exports = router;

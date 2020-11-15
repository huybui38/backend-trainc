const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");
const upload_submit = require("../controllers/submit/upload.submit");
const getAll_submit = require("../controllers/submit/getAll.submit");

router.post("/:id", auth, isAdmin, upload, upload_submit);
router.get("/", auth, isAdmin, getAll_submit);

module.exports = router;

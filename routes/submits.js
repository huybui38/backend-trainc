const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMentor = require("../middleware/isMentor");
const upload = require("../middleware/upload");
const compileFile = require("../middleware/compileFile");
const uploadCompile = require("../middleware/uploadCompile");
const runFile_submit = require("../controllers/submit/runFile.submit");
const upload_submit = require("../controllers/submit/upload.submit");
const getAll_submit = require("../controllers/submit/getAll.submit");
const update_submit = require("../controllers/submit/update.submit");

router.post("/:id", auth, upload, upload_submit);
router.post("/check/:id", auth, uploadCompile, compileFile, runFile_submit);
router.put("/:id", auth, isMentor, update_submit);
router.get("/", auth, getAll_submit);

module.exports = router;

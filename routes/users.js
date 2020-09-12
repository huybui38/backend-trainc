const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const update_user = require("../controllers/users/update.user");
const create_user = require("../controllers/users/create.user");
const login_user = require("../controllers/users/login.user");
const changePassword_user = require("../controllers/users/changePassword.user");
const changeName_user = require("../controllers/users/changeName.user");
const getProfile_user = require("../controllers/users/getProfile.user");

router.post("/", auth, isAdmin, create_user);
router.post("/login", login_user);
router.get("/:mssv", auth, getProfile_user);
router.put("/:mssv/passwords", auth, changePassword_user);
router.put("/:mssv/names", auth, changeName_user);

// router.route("/:user_id").put(update_user);

module.exports = router;

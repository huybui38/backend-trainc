const express = require("express");
const router = express.Router();
const update_user = require("../controllers/users/update.user");
const create_user = require("../controllers/users/create.user");
const login_user = require("../controllers/users/login.user");
const { User } = require("../models/User.model");
const validator = require("../middleware/validator");

router.post("/login", validator(User.validatorSchema(["mssv", "password"])), login_user);
// router.route("/login").post(login_user);

// router.route("/:user_id").put(update_user).post(create_user);

module.exports = router;

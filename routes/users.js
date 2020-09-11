const express = require("express");
const router = express.Router();
const { User } = require("../models/User.model");
const validator = require("../middleware/validator");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const update_user = require("../controllers/users/update.user");
const create_user = require("../controllers/users/create.user");
const login_user = require("../controllers/users/login.user");
const changePassword_user = require("../controllers/users/changePassword.user");
const changeName_user = require("../controllers/users/changeName.user");
const { changeName } = require("../../backend-trainc/controller/user.controller");

router.post("/login", validator(User.validatorSchema(["mssv", "password"])), login_user);
router.put(
    "/passwords",
    auth,
    validator(User.validatorSchema(["password", "newPassword", "confirm"])),
    changePassword_user
);
router.put("/names", auth, validator(User.validatorSchema(["password", "name"])), changeName_user);
router.post("/", auth, isAdmin, validator(User.validatorSchema(["mssv", "name", "role"])), create_user);

// router.route("/:user_id").put(update_user);

module.exports = router;

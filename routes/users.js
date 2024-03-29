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
const getAll_user = require("../controllers/users/getAll.user");
const logout_user = require("../controllers/users/logout.user");
const getCourses_user = require("../controllers/users/getCourses.user");
const getSubmits_user = require("../controllers/users/getSubmits.user");
const getExercises_user = require("../controllers/users/getExercises.user");
const getGroups_user = require("../controllers/users/getGroups.user");
const loginGoogle_user = require("../controllers/users/loginGoogle.user");

router.put("/:code/passwords", auth, changePassword_user);
router.put("/:code/names", auth, changeName_user);
router.get("/:code/courses", auth, getCourses_user);
router.get("/:code/submits", auth, getSubmits_user);
router.get("/:code/exercises", auth, getExercises_user);
router.get("/:code/groups", auth, getGroups_user);
router.post("/login", login_user);
router.post("/google", loginGoogle_user);
router.post("/logout", auth, logout_user);
router.put("/:code", auth, isAdmin, update_user);
router.get("/:code", auth, getProfile_user);
router.post("/", auth, isAdmin, create_user);
router.get("/", auth, isAdmin, getAll_user);

module.exports = router;

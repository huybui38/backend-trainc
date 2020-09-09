const express = require("express");
const router = express.Router();
const update_user = require("../controllers/users/update.user");
const create_user = require("../controllers/users/create.user");

router.route('/:user_id')
    .put(update_user)
    .post(create_user)

module.exports = router;

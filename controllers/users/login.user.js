const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const _ = require("lodash");

const loginUser = AsyncCatch(async (req, res, next) => {
    console.log(req.input);
    res.send("ok");
});

module.exports = loginUser;

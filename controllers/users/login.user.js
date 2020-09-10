const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const User = require("../../models/User.model");

const loginUser = AsyncCatch(async (req, res, next) => {});

module.exports = loginUser;

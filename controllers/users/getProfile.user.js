const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const _ = require("lodash");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

const createUser = AsyncCatch(async (req, res, next) => {
    const user = _.pick(req.user, ["code", "name", "role"]);

    const params = validator(validatorSchema(["code"]), req.params);
    if (user.code !== params.code) throw new NotFound("Not found.");

    res.send(user);
});

module.exports = createUser;

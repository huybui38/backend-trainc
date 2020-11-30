const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const _ = require("lodash");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    if (req.user.code !== params.code) throw new NotFound("Not found.");
    
    const user = _.pick(req.user, ["code", "name", "role", "point"]);
    res.send(user);
});


const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound } = require("../../helpers/errors.helper");
const _ = require("lodash");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    const user = await User.findOne({ code: params.code });
    if (!user) throw new NotFound("Not found.");
    
    const result = _.pick(user, ["code", "name", "role", "point"]);
    res.send(result);
});

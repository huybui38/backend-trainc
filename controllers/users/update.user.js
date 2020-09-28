const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);
    if (req.user.code !== params.code) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["role", "active"]), req.body);

    const result = await User.findByIdAndUpdate(params.code, { $set: { role: input.role, active: input.active } });
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("User was updated successfully.");
});

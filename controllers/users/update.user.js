const { AsyncCatch } = require("../../helpers/utils.helper");
const { NotFound, DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);

    const user = await User.findOne({ code: params.code });
    if (!user) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["role", "active"]), req.body);

    const result = await User.findOneAndUpdate(
        { code: params.code },
        { $set: { role: input.role, active: input.active } }
    );
    if (!result) throw new DefaultError("Can't connect to database.");

    res.send("User was updated successfully.");
});

const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, Unauthorized } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

const updateUser = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["mssv", "role", "active"]), req.body);

    const result = await User.findOneAndUpdate(
        { mssv: input.mssv },
        { $set: { role: input.role, active: input.active } }
    );

    if (!result) throw new Unauthorized("MSSV is not correct.");
    res.send("Update successful.");
});

module.exports = updateUser;

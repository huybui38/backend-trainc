const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized, DefaultError, NotFound } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

module.exports = AsyncCatch(async (req, res, next) => {
    const params = validator(validatorSchema(["code"]), req.params);

    if (req.user.code !== params.code) throw new NotFound("Not found.");

    const input = validator(validatorSchema(["password", "name"]), req.body);
    const isCorrect = await compareHashingString(input.password, req.user.password);
    if (!isCorrect) throw new Unauthorized("Password is not correct.");

    const result = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { name: input.name } });

    if (!result) throw new DefaultError("Can't connect to database.");
    res.send("Name was changed successfully.");
});

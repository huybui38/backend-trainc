const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const { getUserToken } = require("../../helpers/jwt.helper");
const validator = require("../../helpers/validator.helper");
const validatorSchema = require("../../validators/user.validator");

const loginUser = AsyncCatch(async (req, res, next) => {
    const input = validator(validatorSchema(["code", "password"]), req.body);

    const user = await User.findOne({ code: input.code });
    if (!user) throw new Unauthorized("Student code or password is not correct.");

    const isCorrect = await compareHashingString(input.password, user.password);
    if (!isCorrect) throw new Unauthorized("Student code or password is not correct.");

    const token = getUserToken(user);
    res.cookie("token", token).send("Login success.");
});

module.exports = loginUser;

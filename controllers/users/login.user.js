const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { compareHashingString } = require("../../helpers/bcrypt.helper");
const { getUserToken } = require("../../helpers/jwt.helper");

const loginUser = AsyncCatch(async (req, res, next) => {
    const user = await User.findOne({ mssv: req.input.mssv });
    const isCorrect = await compareHashingString(req.input.password, user.password);
    if (!user || !isCorrect) throw new Unauthorized("MSSV or password is not correct.");
    const token = getUserToken(user);
    res.cookie("token", token).send("Login successful.");
});

module.exports = loginUser;

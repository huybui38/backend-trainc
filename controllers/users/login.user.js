const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString, compareHashingString } = require("../../helpers/bcrypt.helper");

const loginUser = AsyncCatch(async (req, res, next) => {
    const user = await User.findOne({ mssv: req.input.mssv });
    const isCorrect = await compareHashingString(req.input.password, user.password);
    if (!user || !isCorrect) throw new DefaultError("MSSV or password is not correct.", STATUS_CODE.UNAUTHORIZED);

    const token = User.getUserToken(user.mssv, user._id, user.role);
    console.log(token);

    res.cookie("token", token).send("Login successful.");
});

module.exports = loginUser;

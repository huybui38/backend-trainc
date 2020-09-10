const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError, BadRequest, STATUS_CODE } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString, compareHashingString } = require("../../helpers/bcrypt.helper");
const _ = require("lodash");

const loginUser = AsyncCatch(async (req, res, next) => {
    const user = await User.findOne({ mssv: req.input.mssv });
    const isCorrect = await compareHashingString(password, user.password);
    if (!user || !isCorrect) throw new DefaultError("MSSV or password is not correct.", STATUS_CODE.UNAUTHORIZED);

    const token = User.getUserToken(user.mssv, user._id, user.role);
    res.status.cookie("token", token).send("ok");
});

module.exports = loginUser;
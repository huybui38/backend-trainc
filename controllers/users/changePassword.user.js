const { AsyncCatch } = require("../../helpers/utils.helper");
const { Unauthorized, DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { compareHashingString, hashingString } = require("../../helpers/bcrypt.helper");

const changePassword = AsyncCatch(async (req, res, next) => {
    const isCorrect = await compareHashingString(req.input.password, req.user.password);
    if (!isCorrect) throw new Unauthorized("Password is not correct.");

    const newHashingPassword = await hashingString(req.input.newPassword);
    const result = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { password: newHashingPassword } });

    if (!result) throw new DefaultError("Can't connect to database.");
    res.send("Change password successful.");
});

module.exports = changePassword;
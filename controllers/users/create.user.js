const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");
const { hashingString } = require("../../helpers/bcrypt.helper");

const defaultPassword = "123456789";
const defaultRound = 10;

const createUser = AsyncCatch(async (req, res, next) => {
    const user = await User.findOne({ mssv: req.input.mssv });
    if (user) throw new BadRequest("MSSV is taken.");

    req.input.password = await hashingString(defaultPassword, defaultRound);

    User.create(req.input);
    res.send("Create user successful.");
});

module.exports = createUser;

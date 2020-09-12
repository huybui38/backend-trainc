const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");

const getAll = AsyncCatch(async (req, res, next) => {
    const users = await User.find().sort({ name: 1 });
    if (!users) throw new DefaultError("Can't connect to database.");
    res.send(users);
});

module.exports = getAll;

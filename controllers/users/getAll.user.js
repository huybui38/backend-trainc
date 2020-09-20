const { AsyncCatch } = require("../../helpers/utils.helper");
const { DefaultError } = require("../../helpers/errors.helper");
const { User } = require("../../models/User.model");

module.exports = AsyncCatch(async (req, res, next) => {
    const users = await User.find({}, ["code", "name", "active", "role"]).sort({ name: 1 });
    if (!users) throw new DefaultError("Can't connect to database.");
    res.send(users);
});

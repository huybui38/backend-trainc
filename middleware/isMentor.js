const { Forbidden, Unauthorized } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const role = req.user.role;
    if (!role) throw new Unauthorized("Access denied. No role provided.");
    if (role !== "2" && role !== "1") throw new Forbidden("Forbidden.");
    next();
});
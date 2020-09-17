const { Forbidden, Unauthorized } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const admin = req.user.role;
    if (!admin) throw new Unauthorized("Access denied. No role provided.");
    if (admin !== "2") throw new Forbidden("Forbidden.");
    next();
});

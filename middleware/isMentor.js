const { Forbidden, Unauthorized } = require("../helpers/errors.helper");
const { AsyncCatch } = require("../helpers/utils.helper");
const { UserRoleEnum } = require("../helpers/userRoleEnum.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    const role = req.user.role;
    if (!role) throw new Unauthorized("Access denied. No role provided.");
    if (role === UserRoleEnum.STUDENT) throw new Forbidden("Forbidden.");
    next();
});

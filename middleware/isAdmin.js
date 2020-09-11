const { Forbidden, Unauthorized } = require("../helpers/errors.helper");

module.exports = (req, res, next) => {
    const admin = req.user.role;
    if (!admin) throw new Unauthorized("Access denied. No role provided.");
    if (admin !== "2") throw new Forbidden("Forbidden.");
    next();
};

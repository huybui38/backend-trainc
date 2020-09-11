const { DefaultError, BadRequest, STATUS_CODE } = require("../helpers/errors.helper");

module.exports = (req, res, next) => {
    const admin = req.user.role;
    if (!admin) throw new DefaultError("Access denied. No role provided.", STATUS_CODE.UNAUTHORIZED);
    if (admin !== "2") throw new DefaultError("Forbidden.", STATUS_CODE.FORBIDDEN);
    next();
};

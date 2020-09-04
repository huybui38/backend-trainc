const { User } = require("../models/user.model");

module.exports = (req, res, next) => {
    const admin = req.user.role;
    if (!admin)
        return res.status(401).json({
            status: 401,
            data: null,
            text: "Access denied. No role provided.",
        });
    if (admin !== "2")
        return res.status(403).json({
            status: 403,
            data: null,
            text: "Forbidden",
        });
    next();
};

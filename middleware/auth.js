const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");
const { Unauthorized } = require("../helpers/errors.helper");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new Unauthorized("Access denied. No token provided.");

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decode._id);
        next();
    } catch (error) {
        throw new Unauthorized(error);
    }
};

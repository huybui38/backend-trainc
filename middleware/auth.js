const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");
const { DefaultError, BadRequest, STATUS_CODE } = require("../helpers/errors.helper");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) throw new DefaultError("Access denied. No token provided.", STATUS_CODE.UNAUTHORIZED);

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decode._id);
        next();
    } catch (error) {
        throw new DefaultError(error, STATUS_CODE.UNAUTHORIZED);
    }
};

const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            status: 401,
            data: null,
            text: "Access denied. No token provided.",
        });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.getClassById(decode._id);
        next();
    } catch (error) {
        return res.status(400).json({
            status: 400,
            data: null,
            text: "Invalid token",
        });
    }
};

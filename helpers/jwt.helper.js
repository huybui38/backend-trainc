const jwt = require("jsonwebtoken");

module.exports.getUserToken = function ({ _id }) {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
};

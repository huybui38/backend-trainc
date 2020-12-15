const { AsyncCatch } = require("../../helpers/utils.helper");

module.exports = AsyncCatch(async (req, res, next) => {
    res.clearCookie("token");
    res.send("Logout success.");
});
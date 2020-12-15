const { DefaultError, STATUS_CODE } = require("./errors.helper");
const AsyncCatch = (fn) => {
    return (req, res, next) => fn(req, res, next).catch(next);
};

require("dotenv").config();
const handleError = (err, req, res, next) => {
    if (err instanceof DefaultError) {
        return res.status(err.getCode()).json({
            message: err.message,
        });
    }
    // if (process.env.NODE_ENV !== "production")
    console.log(err);
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        message: `Something wrongs !!`,
    });
};
module.exports = {
    AsyncCatch,
    handleError,
};

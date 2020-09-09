const {DefaultError,STATUS_CODE} = require("./errors.helper");
const AsyncCatch = (fn) => {
    return (req, res, next) => fn(req, res, next).catch(next);
}
const handleError = (err, req, res, next) => {
    if (err instanceof DefaultError){
        return res.status(err.getCode())
            .json({
                message:err.message
            });
    }
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message:err
        });
}
module.exports = {
    AsyncCatch,
    handleError,
}
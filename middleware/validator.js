const _ = require("lodash");
const { DefaultError, BadRequest, STATUS_CODE } = require("../helpers/errors.helper");
const Joi = require("@hapi/joi");

module.exports = (fields) => {
    return (req, res, next) => {
        const input = [];
        for (let item in fields) input.push(item);

        const info = _.pick(req.body, input);

        const { error, value } = Joi.object(fields).validate(info);
        if (error) {
            throw new BadRequest(error.message);
        }
        req.input = value;
        next();
    };
};

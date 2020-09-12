const _ = require("lodash");
const { BadRequest } = require("./errors.helper");
const Joi = require("@hapi/joi");

module.exports = (fields, values) => {
    const input = [];
    for (let item in fields) input.push(item);
    const info = _.pick(values, input);
    const { error, value } = Joi.object(fields).validate(info);
    if (error) throw new BadRequest(error.message);
    return value;
};

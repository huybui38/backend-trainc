const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "id":
                return Joi.objectId();
            case "name":
                return Joi.string().min(2).max(255).trim().required();
            case "password":
                return Joi.string().min(8).max(255).alphanum().required();
            case "course":
                return Joi.string().min(2).max(255).trim().required();
            case "active":
                return Joi.boolean().required();
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};

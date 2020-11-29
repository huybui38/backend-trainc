const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = function (fields = []) {
    const getSchema = (field) => {
        switch (field) {
            case "id":
                return Joi.objectId();
            case "code":
                return Joi.string().min(2).max(255).required();
            case "content":
                return Joi.string().min(2).max(2000).required();
            case "course":
                return Joi.string().min(2).max(255).trim().required();
            case "group":
                return Joi.string().min(2).max(255);
            case "active":
                return Joi.boolean().required();
            case "point":
                return Joi.number().required();
            case "attempt":
                return Joi.number().required();
            case "deadline":
                return Joi.date().required();
            case "type":
                return Joi.boolean().required(); //true bai tap rieng
        }
    };

    const schema = {};

    for (let item of fields) {
        schema[`${item}`] = getSchema(item);
    }

    return schema;
};
